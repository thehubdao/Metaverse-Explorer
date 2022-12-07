The Map <TileMap/> on <Valuation.tsx/> takes an Atlas Object that contains both maps

Should look something like this... atlas = {ITRM: itrmMap, decentraland: decentralandMap}.

We fetch those maps on the first useEffect() using fetchDecentralandAtlas() and fetchITRMAtlas()

The map draws the tiles through its layers. As of now theres
decentralandAPILayer,
filteredLayer,
selectedStrokeLayer,
selectedFillLayer,
hoverLayer,

Each layer is a function that gets called on each map/mouse move and is called on all tiles.

This is the type of the function. It takes at least an x and y argument and should return either null or a Tile object
export type Layer = (
x: number,
y: number,
atlas?: Atlas,
filter?: MapFilter,
percentFilter?: PercentFilter,
legendFilter?: LegendFilter
) => Tile | null

a Tile object looks like this. The most important thing is the color and the scale (size of the tile) we are not modifying the other elements so they are mostly just false.

export type Tile = {
color: string
top?: boolean
left?: boolean
topLeft?: boolean
scale?: number
}

An example of how layers work is the hoverLayer

const hoverLayer: Layer = (x, y) => {
return hovered?.coords?.x === x && hovered?.coords?.y === y
? { color: '#db2777', scale: 1.4 }
: null
}

it checks that hovered?.coords?.x (this is the x that's being hovered right now) is equal to the x of the tile that is passed when the whole atlas is iterated. If we find a matching one, we change the colour and make it bigger. If not we return null.

Because there are more than 1 layer. Even if we are returning null on this hoverLayer, another layer might still be returning a color, therefore drawing a tile. All the layers are being constantly ran and drawing on top of each other.

The color of the decentralandTiles are based off
The color of the ITRM tiles are based on a percentage that depends on the MapFilter that's chosen.
This could be "predicted_price", "transfers" etc..
On the second useEffect, when change the colors of the tiles everytime that filter changes.

const atlasWithColours = setColours(atlas.ITRM, filterBy)

setColours actually sets the percentages of each tile.
Its a function divided in 2. The first half iterates through the atlas and creates a big array of things that are decided by the filter. In the case of transfers for example, it checks on the .history?.length of each tile.

Then, we find the max amount from that array.

On the second half of that function, we iterate through all the tiles again, but this time we check what percentage of the max does that tile's transfers (or other thing) represents.
This adds a percentage to the atlas object and returns it. So we now have the same atlas with percentages that we can use to generate colours

This colors, like written before. Are assigned on each layer which return a Tile object containing an actual rgb color.

The percentage colors are assigned on the filteredLayer inside <heatmapLayers.tsx>.

This layer will check if the atlas is decentraland or ITRM and act accordingly.
When user chooses decentraland metaverse, both atlas will be there at the same time.

If you check inside of decentralandAPILayer. That's the layer being called on the decentraland API map
with their native colors. Its returning a tile and the important thing being done there is this:
const color = DECENTRALAND_API_COLORS[tile.type] . Which assings the color to an object containing
all the colors of decentraland and it will change depending on the tile.type.

On the filteredLayer there's a lot of checks that are commented on the function itself. But at some stage of the function. the function getTileColor() is called. This function will return an rgb color based on the percentage, the filter and the legend filter. If not, we will set a fixed color. All commented on that code to make it clearer.
