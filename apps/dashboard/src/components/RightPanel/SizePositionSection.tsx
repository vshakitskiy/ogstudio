import { Input } from "../forms/Input";
import type { OGElement } from "../../lib/types";
import { useElementsStore } from "../../stores/elementsStore";

interface SizePositionSectionProps {
  selectedElements: OGElement[];
}

function showMixed(
  selectedElements: OGElement[],
  paramName: "x" | "y" | "width" | "height",
) {
  const elementsValues = selectedElements.map((element) => element[paramName]);
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function setValue(value: string | number) {
  if (typeof value === "number") return value;

  const numberValue = Number(value);
  return isNaN(numberValue) ? Number(value.replace(/\D/g, "")) : numberValue;
}

export function SizePositionSection({
  selectedElements,
}: SizePositionSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <>
      <p className="text-xs text-gray-600">Size & Position</p>
      <div className="grid grid-cols-2 gap-2">
        <Input
          onChange={(value) => {
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                x: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                x:
                  direction === "down"
                    ? selectedElement.x - 1
                    : selectedElement.x + 1,
              });
            });
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "x") ? "text" : "number"}
          value={
            showMixed(selectedElements, "x") ? "Mixed" : selectedElements[0].x
          }
        >
          X
        </Input>
        <Input
          onChange={(value) => {
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                y: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                y:
                  direction === "down"
                    ? selectedElement.y - 1
                    : selectedElement.y + 1,
              });
            });
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "y") ? "text" : "number"}
          value={
            showMixed(selectedElements, "y") ? "Mixed" : selectedElements[0].y
          }
        >
          Y
        </Input>
        <Input
          onChange={(value) => {
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                width: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                width:
                  direction === "down"
                    ? selectedElement.width - 1
                    : selectedElement.width + 1,
              });
            });
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "width") ? "text" : "number"}
          value={
            showMixed(selectedElements, "width")
              ? "Mixed"
              : selectedElements[0].width
          }
        >
          W
        </Input>
        <Input
          onChange={(value) => {
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                height: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                height:
                  direction === "down"
                    ? selectedElement.height - 1
                    : selectedElement.height + 1,
              });
            });
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "height") ? "text" : "number"}
          value={
            showMixed(selectedElements, "height")
              ? "Mixed"
              : selectedElements[0].height
          }
        >
          H
        </Input>
      </div>
    </>
  );
}
