import * as SVG from 'svgjs';
import { findAncestor } from './utils';

interface Point {
    x: number,
    y: number
}

function drawLines(container: Element) {
    let root = <HTMLElement>container.querySelector(".qp-root");
    let draw = SVG(root);

    let clientRect = root.getBoundingClientRect();

    let nodes = root.querySelectorAll('.qp-node'); 
    for (let i = 0; i < nodes.length; i++) {
        drawLinesForParent(draw, clientRect, nodes[i]);
    }
}

/**
 * Enumerates all child nodes and draws line from those nodes to the given parent node.
 * @param draw SVG drawing context to use.
 * @param offset Bounding client rect of the root SVG context.
 * @param parent Parent .qp-node element.
 */
function drawLinesForParent(draw: SVG.Doc, offset: ClientRect, parent: Element) {
    let children = findAncestor(parent, 'qp-tr').children[1].children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i].children[0].children[0];
        drawArrowBetweenNodes(draw, offset, parent, child);
    }
}

/**
 * Draws the arrow between two nodes.
 * @param draw SVG drawing context to use.
 * @param offset Bounding client rect of the root SVG context.
 * @param parent Node element from which to draw the arrow (leftmost node).
 * @param child Node element to which to draw the arrow (rightmost node).
 */
function drawArrowBetweenNodes(draw: SVG.Doc, offset: ClientRect, parent: Element, child: Element) {
    let parentOffset = parent.getBoundingClientRect();
    let childOffset = child.getBoundingClientRect();

    let toX = parentOffset.right;
    let toY = (parentOffset.top + parentOffset.bottom) / 2;

    let fromX = childOffset.left;
    let fromY = (childOffset.top + childOffset.bottom) / 2;

    let midOffsetLeft = toX / 2 + fromX / 2;

    let toPoint = {
        x: toX - offset.left + 1,
        y: toY - offset.top
    };
    let fromPoint = {
        x: childOffset.left - offset.left - 1,
        y: fromY - offset.top
    };
    let bendOffsetX = midOffsetLeft - offset.left;
    drawArrow(draw, toPoint, fromPoint, bendOffsetX);
}

/**
 * Draws an arrow between two points.
 * @param draw SVG drawing context to use.
 * @param from {x,y} coordinates of tail (flat) end.
 * @param to {x,y} coordinates of the arrowhead (pointy) end.
 * @param bendX Offset from toPoint at which the "bend" should happen. (X axis).
 */
function drawArrow(draw: SVG.Doc, to: Point, from: Point, bendX: number) {
    let points: any = arrowPath(to, from, bendX);
    draw.polyline(points).fill('#E3E3E3').stroke({
        color: '#505050',
        width: 0.5
    });
}

/**
 * Creates the path for an arrow between two points.
 * @param to Coordinates of the the arrowhead (pointy) end.
 * @param from mid-point of the tail (flat) end.
 * @param bendX Offset from toPoint at which the "bend" should happen. (X axis).
 */
function arrowPath(to: Point, from: Point, bendX: number) {
    return [
        [to.x, to.y],
        [to.x + 3, to.y - 3],
        [to.x + 3, to.y - 1],
        [bendX + (to.y <= from.y ? 1 : -1), to.y - 1],
        [bendX + (to.y <= from.y ? 1 : -1), from.y - 1],
        [from.x, from.y - 1],
        [from.x, from.y + 1],
        [bendX + (to.y <= from.y ? -1 : 1), from.y + 1],
        [bendX + (to.y <= from.y ? -1 : 1), to.y + 1],
        [to.x + 3, to.y + 1],
        [to.x + 3, to.y + 3],
        [to.x, to.y]
    ];
}

export { drawLines, arrowPath }