<template>
	<div class="">
		<canvas id="rotatingGlobe" width="400" height="400" style="width: 400px; height: 400px; cursor: move;"></canvas>
	</div>
</template>

<script>
export default {
	props: ['listLocation', 'isReCheckLocation'],
	data() {
		return {
			globe: {},
			timeToReloadMap: 5000,
			intervalMap: {}
		}
	},
	mounted() {
		this.globe = planetaryjs.planet();
		this.globe.loadPlugin(this.autorotate(10));
		this.globe.loadPlugin(planetaryjs.plugins.earth({
		    topojson: { file: '/js/globe/world-110m-withlakes.json' },
		    oceans: { fill: '#000080' },
		    land: { fill: '#0ed672' },
		    borders: { stroke: '#008000' }
		}));
		this.globe.loadPlugin(this.lakes({
		    fill: '#000080'
		}));
		this.globe.loadPlugin(planetaryjs.plugins.pings());
		this.globe.loadPlugin(planetaryjs.plugins.zoom({
		    scaleExtent: [150, 600]
		}));
		this.globe.loadPlugin(planetaryjs.plugins.drag({
		    onDragStart: function() {
		        this.plugins.autorotate.pause();
		    },
		    onDragEnd: function() {
		        this.plugins.autorotate.resume();
		    }
		}));
		this.globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);
		var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
		let self = this

		self.intervalMap = setInterval(function() {
			if(self.isReCheckLocation) {
				self.setLocation(self.listLocation, colors)
				self.timeToReloadMap = 60000
			}
		}, self.timeToReloadMap);
		var canvas = document.getElementById('rotatingGlobe');
		if (window.devicePixelRatio == 2) {
		    canvas.width = 800;
		    canvas.height = 800;
		    var context = canvas.getContext('2d');
		    context.scale(2, 2);
		}
		this.globe.draw(canvas);
	},
	beforeDestroy() {
		clearInterval(this.intervalMap)
	},
	methods: {
		setLocation(list_locations, colors) {
			let self = this
			Object.keys(list_locations).forEach(function (key) {
			   // do something with obj[key]
			   var color = colors[Math.floor(Math.random() * colors.length)];
			   self.globe.plugins.pings.add(list_locations[key].longitude, list_locations[key].latitude, { color: color, ttl: 2000, angle: Math.random() * 10 })
			});
			// list_locations.forEach(location => {
			// 	var color = colors[Math.floor(Math.random() * colors.length)];
			//     self.globe.plugins.pings.add(location.longitude, location.latitude, { color: color, ttl: 2000, angle: Math.random() * 10 })
			// })
		},
		lakes(options) {
		    options = options || {};
		    var lakes = null;

		    return function(planet) {
		        planet.onInit(function() {
		            var world = planet.plugins.topojson.world;
		            lakes = topojson.feature(world, world.objects.ne_110m_lakes);
		        });

		        planet.onDraw(function() {
		            planet.withSavedContext(function(context) {
		                context.beginPath();
		                planet.path.context(context)(lakes);
		                context.fillStyle = options.fill || 'black';
		                context.fill();
		            });
		        });
		    };
		},
		autorotate(degPerSec) {
            return function(planet) {
                var lastTick = null;
                var paused = false;
                planet.plugins.autorotate = {
                    pause: function() { paused = true; },
                    resume: function() { paused = false; }
                };
                planet.onDraw(function() {
                    if (paused || !lastTick) {
                        lastTick = new Date();
                    } else {
                        var now = new Date();
                        var delta = now - lastTick;
                        var rotation = planet.projection.rotate();
                        rotation[0] += degPerSec * delta / 1000;
                        if (rotation[0] >= 180) rotation[0] -= 360;
                        planet.projection.rotate(rotation);
                        lastTick = now;
                    }
                });
            };
        }
	}
}
</script>

<style lang="css" scoped>
</style>