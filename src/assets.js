/*
 * `assets` module
 * ===============
 *
 * Declares static asset packs to be loaded using the `Phaser.Loader#pack`
 * method. Use this module to declare game assets.
 */

//  -- Splash screen assets used by the Preloader.
export const preloaderAssets = [
	{
		key: 'loadingtext',
		type: 'image'
	}, 
	{
		key: 'loading_clock',
		type: 'spritesheet',
		frameWidth: 39,
		frameHeight: 39
		
	}
];

//  -- General assets used throughout the game.
export const gameAssets = [
	/*
	{
		key: 'phaser',
		type: 'image'
	}
	*/
	{
		type: 'tilemap',
		key: 'data/test_map',
		format: 'CSV'
	},
	{
		type: 'image',
		key: 'tileset'
	}
];
