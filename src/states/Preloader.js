/*
 * Preloader state
 * ===============
 *
 * Takes care of loading the main game assets, including graphics and sound
 * effects, while displaying a busy splash screen.
 */

import {gameAssets} from '../assets';

export default class Preloader extends Phaser.State 
{

	preload() 
	{
		this.game.stage.backgroundColor = "#1e3444";
		//  Here is a good place to initialize plugins dependent of any game asset.
		//  Don't forget to `import` them first. Example:
		// this.game.myPlugin = this.plugins.add(MyPlugin/*, ... parameters ... */);
		var clock = this.add.sprite(this.game.width/2, this.game.height/2, 'loading_clock');
		clock.anchor.setTo(1,0.5);
		var loadingtext = this.add.sprite(this.game.width/2, this.game.height/2, 'loadingtext');
		loadingtext.anchor.setTo(0,0.5);
		clock.animations.add('load');
		clock.animations.play('load', 20, true);
				
		this.load.pack('gameAssets', null, {gameAssets});
	}

	create() 
	{
		this.state.start('Game');
	}
}
