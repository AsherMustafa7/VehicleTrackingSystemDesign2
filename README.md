For Preview : https://ashermustafa7.github.io/VehicleTrackingSystemDesign2/

🚀 Key Features, Technologies Used & What I Learned
📦 Three.js for Interactive 3D Rendering

Used three.js for rendering real-time 3D objects (GLB models) in a browser.

Learned to set up Scene, PerspectiveCamera, and WebGLRenderer, and configure things like lighting, shadows, and environment maps.

📁 Loading .glb Models with GLTFLoader

Imported and rendered 3D assets (remote_control_device.glb and animated_sci-fi_globe_test.glb).

Adjusted model scale, rotation, and position using Box3 to center them correctly.

💡 Lighting System

Added ambient and directional lights with proper intensity and shadow configuration.

Learned how shadows work in Three.js, including using PCFSoftShadowMap and configuring shadow camera bounds.

🌎 HDR Environment Map with RGBELoader

Loaded a .hdr file using RGBELoader to simulate realistic reflections via PMREMGenerator.

Understood how to convert equirectangular HDR textures into environment maps.

🌀 3D Animation Using AnimationMixer

Triggered animation clips embedded in .glb files using THREE.AnimationMixer.

Learned to update animations smoothly in the render loop using clock.getDelta().

📜 GSAP ScrollTrigger for Scroll-Based Transitions

Integrated GSAP’s ScrollTrigger to control opacity of .hero-text-panel elements.

Created a smooth transition where different panels appear based on scroll position.

🧠 Smart Scroll with Lenis

Used the Lenis library to enable smooth and inertia-based scrolling for a better UX.

🧩 CSS Layouts with Flexbox & Media Queries

Designed responsive layouts using flexbox, %/vw/vh units, and media queries for different screen sizes.

Learned how to keep sections like .navbar, .hero, .intro, .banner, etc., consistent across resolutions.

📍Popup Toggle with JavaScript DOM Manipulation

Implemented interactive popups (e.g., floating image click) using event listeners to toggle CSS classes.

✨ Scroll-Animated Hero Text Panels

Positioned multiple text panels inside the .hero section and transitioned their visibility as users scroll.

Gained experience in managing text animations for storytelling using GSAP’s timeline.

🎨 Theming and Branding

Carefully selected and customized brand colors like rgb(255, 173, 40) for call-to-actions and highlights.

Implemented custom font imports like Poppins and ICA Rubrik from Google and CDN fonts for consistent typography.

📱 Responsive 3D Rotating Carousel

Created a rotating 3D image carousel in .banner .slider using @keyframes and transform-style: preserve-3d.

Understood how to position and rotate elements in 3D space using CSS.

📦 Reusable Components & Utility Classes

Designed modular and reusable sections like .introcontainer, .fleetmitra-section, .footer, and .objectives for better scalability.

📊 Animated Counter Section (Objective Counters)

Built an animated counter panel that could be hooked to dynamic data later (e.g., total fleet, accidents handled, etc.)

🧠 Project Structure & Development Practices Learned

Improved understanding of integrating modern web libraries (Three.js, GSAP) into a real-world UI.

Practiced loading 3D assets, triggering animations, managing multiple render loops, and controlling scroll interactions smoothly.
