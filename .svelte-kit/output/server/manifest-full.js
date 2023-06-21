export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","icon/arrow.svg","icon/down-arrow.svg","icon/heart.svg","icon/home.svg","icon/left-arrow.svg","icon/menu.svg","icon/redo.png","icon/right-arrow.svg","icon/undo.png","icon/up-arrow.svg","images/.DS_Store","images/dirty-wicker/dirty-wicker-albedo.png","images/dirty-wicker/dirty-wicker-ao.png","images/dirty-wicker/dirty-wicker-dx.png","images/dirty-wicker/dirty-wicker-height.png","images/dirty-wicker/dirty-wicker-metallic.png","images/dirty-wicker/dirty-wicker-preview.jpg","images/dirty-wicker/dirty-wicker-roughness.png","images/leather1.jpg","images/leather2.jpg","images/leather3.jpg","images/leather4.jpg","images/leather5.jpg","images/leather6.png","model/.DS_Store","model/loafer/.DS_Store","model/loafer/Loafers.glb","model/skybox/skybox_back.png","model/skybox/skybox_down.png","model/skybox/skybox_front.png","model/skybox/skybox_left.png","model/skybox/skybox_right.png","model/skybox/skybox_up.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".glb":"model/gltf-binary"},
	_: {
		client: {"start":"_app/immutable/entry/start.ca9ecfc0.js","app":"_app/immutable/entry/app.a0ea20e5.js","imports":["_app/immutable/entry/start.ca9ecfc0.js","_app/immutable/chunks/index.0a71bab1.js","_app/immutable/chunks/singletons.ecd5df17.js","_app/immutable/chunks/index.d626b966.js","_app/immutable/entry/app.a0ea20e5.js","_app/immutable/chunks/index.0a71bab1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
