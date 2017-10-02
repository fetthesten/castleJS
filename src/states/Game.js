/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */
import Player from '../objects/Player';
 
export default class Game extends Phaser.State 
{

	create() 
	{
		this.game.stage.backgroundColor = "#1e3444";
		
		var map = this.game.add.tilemap('data/test_map', 32, 32);
		map.addTilesetImage('tileset');
		map.setCollisionBetween(0,100);
		this.layer = map.createLayer(0);
		this.layer.resizeWorld();
		
		var bmd = this.game.add.bitmapData(32,32);
		bmd.ctx.beginPath();
		bmd.circle(16,16,16);
		bmd.ctx.fillStyle='#00ff00';
		bmd.ctx.fill();
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.keys = this.game.input.keyboard.addKeys({ 'attack': Phaser.KeyCode.Z });
				
		this.player = new Player(this.game,1024,1096,bmd);
		this.game.add.existing(this.player);
		
		this.game.camera.follow(this.player);
	}
	
	update()
	{
		this.game.physics.arcade.collide(this.player, this.layer);
		
	}
}
