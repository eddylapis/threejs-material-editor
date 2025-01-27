var ThreeCore = function () {

  var self = this;
  var container, renderer;
  var sky, scene, light, ambientLight;
  var camera, cameraController;

  // 初始化
  self.init = function () {

    // 画布
    container = self.container = document.getElementById("editor_canvas");

    // 渲染器
    renderer = self.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x888888);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 场景
    scene = self.scene = new THREE.Scene();
    scene.position.set(0, 0, 0);

    // 主光源
    light = self.light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-500, 500, -500);
    light.target = scene;
    scene.add(light);

    // 环境光
    ambientLight = self.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

    // 摄像机
    camera = self.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(30, 30, -30);
    camera.lookAt(scene.position);

    // 摄像机控制器
    cameraController = self.cameraController = new THREE.OrbitControls(camera, renderer.domElement);
    cameraController.enablePan = true;
    cameraController.panSpeed = 0.02;
    cameraController.enableDamping = true;
    cameraController.dampingFactor = 0.05;
    cameraController.rotateSpeed = 0.025;
    cameraController.minDistance = 2;
    cameraController.maxDistance = 1200;
    cameraController.minPolarAngle = Math.PI * 0.2;
    cameraController.maxPolarAngle = Math.PI * 0.45;

    cameraController.update(); // 首次更正相机控制器

    // 网格辅助线
    var gridHelper = new THREE.GridHelper(28, 28, new THREE.Color(0x222222), new THREE.Color(0xEEEEEE));
    scene.add(gridHelper);

    renderer.render(scene, camera); // 首次画面渲染

    // 初始化加载器
    self.fileLoader = new THREE.FileLoader();
    self.objectLoader = new THREE.ObjectLoader();
    self.materialLoader = new THREE.MaterialLoader();
    self.textureLoader = new THREE.TextureLoader();

  };

  // 重置渲染区域
  self.resizeRenderArea = function () {
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    camera.updateProjectionMatrix();
  };

  // 设置帧更新
  self.setUpdate = function () {
    renderer.setAnimationLoop(this.update);
  };

};
