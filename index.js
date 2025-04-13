const gameEngine = new AnimationEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./images/run.png");
ASSET_MANAGER.queueDownload("./images/run-white.png");
ASSET_MANAGER.queueDownload("./images/run-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/jump-white.png");
ASSET_MANAGER.queueDownload("./images/jump-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/fall-white.png");
ASSET_MANAGER.queueDownload("./images/fall-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/slide-white.png");
ASSET_MANAGER.queueDownload("./images/slide-white-flipped.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("animation");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(new Figure(gameEngine)); //put the gameEngine into HollowKnight entity

	gameEngine.init(ctx);

	gameEngine.start();
});