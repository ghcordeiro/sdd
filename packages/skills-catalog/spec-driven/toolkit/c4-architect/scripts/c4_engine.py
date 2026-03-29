#!/usr/bin/env python3
"""
C4 Architecture Diagram Engine
Reads JSON from stdin, outputs PlantUML code to stdout.
Supports C4 levels 1-3 (Context, Container, Component) and level 4 (Sequence).
"""

import json
import sys

LEVEL_INCLUDES = {
    1: "!include <C4/C4_Context>",
    2: "!include <C4/C4_Container>",
    3: "!include <C4/C4_Component>",
}

VALID_ELEMENT_TYPES = {
    "Person", "Person_Ext",
    "System", "System_Ext",
    "Container", "Container_Ext",
    "ContainerDb", "ContainerDb_Ext",
    "ContainerQueue",
    "Component", "Component_Ext",
    "SystemDb", "SystemDb_Ext",
    "SystemQueue",
}

BOUNDARY_MACROS = {
    1: "Enterprise_Boundary",
    2: "System_Boundary",
    3: "Container_Boundary",
}


def error(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def validate(data):
    if not isinstance(data, dict):
        error("Input must be a JSON object.")
    for field in ("level", "title", "elements"):
        if field not in data:
            error(f"Missing required field: '{field}'")
    level = data["level"]
    if level not in (1, 2, 3, 4):
        error(f"Invalid level: {level}. Must be 1, 2, 3, or 4.")
    for i, el in enumerate(data["elements"]):
        for f in ("alias", "name", "type"):
            if f not in el:
                error(f"Element {i} missing required field: '{f}'")
        if level != 4 and el["type"] not in VALID_ELEMENT_TYPES:
            error(
                f"Element '{el['alias']}' has invalid type: '{el['type']}'. "
                f"Valid types: {', '.join(sorted(VALID_ELEMENT_TYPES))}"
            )
    for i, rel in enumerate(data.get("relations", [])):
        for f in ("from", "to", "label"):
            if f not in rel:
                error(f"Relation {i} missing required field: '{f}'")


def render_c4_element(el):
    alias = el["alias"]
    name = el["name"]
    etype = el["type"]
    desc = el.get("description", "")
    tech = el.get("tech", "")

    if tech:
        return f'{etype}({alias}, "{name}", "{tech}", "{desc}")'
    if desc:
        return f'{etype}({alias}, "{name}", "{desc}")'
    return f'{etype}({alias}, "{name}")'


def render_c4(data):
    level = data["level"]
    title = data["title"]
    layout = data.get("layout", "LEFT_RIGHT")
    elements = data["elements"]
    relations = data.get("relations", [])
    boundaries = data.get("boundaries", [])

    lines = ["@startuml", f"title {title}", ""]
    lines.append(LEVEL_INCLUDES[level])
    lines.append("")
    lines.append(f"LAYOUT_{layout}()")
    lines.append("")

    boundary_elements = set()
    for boundary in boundaries:
        for el_alias in boundary.get("elements", []):
            boundary_elements.add(el_alias)

    for element in elements:
        if element["alias"] not in boundary_elements:
            lines.append(render_c4_element(element))

    if boundaries:
        lines.append("")
        macro = BOUNDARY_MACROS.get(level, "System_Boundary")
        for boundary in boundaries:
            lines.append(f'{macro}({boundary["alias"]}, "{boundary["label"]}") {{')
            for el_alias in boundary.get("elements", []):
                element = next((e for e in elements if e["alias"] == el_alias), None)
                if element:
                    lines.append(f"  {render_c4_element(element)}")
            lines.append("}")
            lines.append("")

    if relations:
        lines.append("")
        for rel in relations:
            protocol = rel.get("protocol", "")
            if protocol:
                lines.append(
                    f'Rel({rel["from"]}, {rel["to"]}, "{rel["label"]}", "{protocol}")'
                )
            else:
                lines.append(f'Rel({rel["from"]}, {rel["to"]}, "{rel["label"]}")')

    lines.append("")
    lines.append("LAYOUT_WITH_LEGEND()")
    lines.append("")
    lines.append("@enduml")
    return "\n".join(lines)


def render_sequence(data):
    title = data["title"]
    elements = data["elements"]
    relations = data.get("relations", [])
    blocks = data.get("blocks", [])

    lines = ["@startuml", f"title {title}", ""]

    for element in elements:
        ptype = element.get("stereotype", "participant")
        lines.append(f'{ptype} "{element["name"]}" as {element["alias"]}')

    lines.append("")

    if blocks:
        for block in blocks:
            btype = block.get("type", "group")
            label = block.get("label", "")

            if btype == "alt":
                lines.append(f"alt {label}")
            elif btype == "else":
                lines.append(f"else {label}")
            elif btype == "opt":
                lines.append(f"opt {label}")
            elif btype == "loop":
                lines.append(f"loop {label}")
            elif btype == "end":
                lines.append("end")
            elif btype == "group":
                lines.append(f"group {label}")

            for rel in block.get("relations", []):
                _render_seq_relation(lines, rel)

        if not any(b.get("type") == "end" for b in blocks):
            lines.append("end")
    else:
        for rel in relations:
            _render_seq_relation(lines, rel)

    lines.append("")
    lines.append("@enduml")
    return "\n".join(lines)


def _render_seq_relation(lines, rel):
    frm = rel["from"]
    to = rel["to"]
    label = rel["label"]
    is_async = rel.get("async", False)
    activate = rel.get("activate", False)
    deactivate = rel.get("deactivate", False)
    is_return = rel.get("return", False)

    arrow = "-->" if is_async else "->"
    if is_return:
        arrow = "-->"
    lines.append(f"{frm} {arrow} {to} : {label}")

    if activate:
        lines.append(f"activate {to}")
    if deactivate:
        lines.append(f"deactivate {frm}")


def main():
    raw = sys.stdin.read().strip()
    if not raw:
        error("No input received. Pipe JSON via stdin.")

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        error(f"Invalid JSON: {exc}")

    validate(data)

    level = data["level"]
    if level == 4:
        result = render_sequence(data)
    else:
        result = render_c4(data)

    print(result)


if __name__ == "__main__":
    main()
