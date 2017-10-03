/*
 * Pools
 * =====
 *
 * sprite pools
 */

export default class Pools 
{

	constructor(game, spriteInfo) 
	{
		this.game = game;
		
		this.pools = {};
		
		// pool multiple sprite classes based on indices from 'spriteInfo'
		for (let className in spriteInfo)
		{
			const newPool = this.game.add.group();
			const poolInfo = spriteInfo[className];
			
			newPool.classType = poolInfo['class'];		// set class to use when expanding the pool
			newPool.createMultiple(poolInfo['count']);	// preallocate
			
			this.pools[className] = newPool;
		}
	}

	getPool(className)
	{
		return this.pools[className];
	}
}
