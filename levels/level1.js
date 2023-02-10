let level1;


/**
 * Initializes the Level1 object
 */
function initLevel1() {
    level1 = new Level(
        createChickens(),
        createSmallChicken(),
        createClouds(),
        createBackgroundLayers(),
        createRotationImg(),
        createCoins(),
        createBottles(),
    );
}


/**
 * Creates an array of chickens
 * @returns {Array.<Chicken>}
 */
function createChickens() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
}


/**
 * Creates an array of small chickens
 * @returns {Array.<SmallChicken>}
 */
function createSmallChicken() {
    return [
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
    ];
}


/**
 * Creates an array of clouds
 * @returns {Array.<Cloud>}
 */
function createClouds() {
    return [(new Cloud(), new Cloud())];
}


/**
 * Creates an array of background objects
 * @returns {Array.<BackgroundObject>}
 */
function createBackgroundLayers() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ];
}


/**
 * Creates an array of rotation images
 * @returns {Array.<string>}
 */
function createRotationImg() {
    return ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'];
}


/**
 * Creates an array of collectable objects
 * @returns {Array.<CollectableObject>}
 */
function createCoins() {
    return [
        new CollectableObject(400),
        new CollectableObject(400 + 50),
        new CollectableObject(400 + 100),
        new CollectableObject(400 * 2),
        new CollectableObject(400 * 2 + 50),
        new CollectableObject(400 * 2 + 100),
        new CollectableObject(400 * 3),
        new CollectableObject(400 * 3 + 50),
        new CollectableObject(400 * 3 + 100),
        new CollectableObject(400 * 4),
        new CollectableObject(400 * 4 + 50),
        new CollectableObject(400 * 4 + 100),
        new CollectableObject(400 * 5),
        new CollectableObject(400 * 5 + 50),
        new CollectableObject(400 * 5 + 100),
    ];
}


/**
 * Creates an array of collectable bottles
 * @returns {Array.<CollectableBottle>}
 */
function createBottles() {
    return [
        new CollectableBottle(250),
        new CollectableBottle(300),
        new CollectableBottle(650),
        new CollectableBottle(700),
        new CollectableBottle(1050),
        new CollectableBottle(1100),
        new CollectableBottle(1450),
        new CollectableBottle(1500),
        new CollectableBottle(1850),
        new CollectableBottle(1900),
    ];
}