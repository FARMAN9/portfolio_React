# VR experience plan

## Goal

Turn the portfolio’s existing 3D gallery into a comfortable, accessible WebXR experience that helps visitors explore Farman’s work and reach project links. Keep the desktop and mobile 3D gallery available when a headset is not connected.

## What the site has today

- The hero and navigation already open a lazy-loaded `VRMode` overlay.
- The overlay renders a Three.js scene with a central avatar, project pedestals, spatial section stations, camera navigation, and a desktop HUD.
- It checks `navigator.xr.isSessionSupported('immersive-vr')` and offers a headset button.
- The scene includes ambient audio, fullscreen, project details, and links.
- The current headset handler calls `navigator.xr.requestSession('immersive-vr')` directly. It does not connect that session to the React Three Fiber renderer, so the button does not yet make the existing scene render in the headset. Headset controls and immersive-session cleanup are also not wired up.

## Experience outline

1. **Enter:** Visitors choose “3D / VR Mode” from the hero or nav. Show a short control hint and a clear desktop/mobile fallback.
2. **Orient:** Start in a calm overview with the avatar and nearby destinations visible. Offer “Projects,” “About,” “Skills,” “Services,” “Recognition,” and “Contact” as destinations.
3. **Explore:** Select a destination with gaze/controller input in a headset, or mouse/touch on a screen. Move between destinations with teleport-style jumps; avoid requiring continuous artificial movement.
4. **Inspect:** Open compact, readable project or section details with working demo, source, and contact links. Provide an obvious close/back action.
5. **Exit:** Let the visitor end the headset session using the browser/headset controls or the in-scene exit control, returning to the portfolio page.

## Implementation phases

### 1. Make the existing gallery dependable

- Connect WebXR to the existing R3F `Canvas` renderer using its supported XR integration; request and end sessions through that integration rather than opening a detached browser XR session.
- Handle unsupported browsers, denied permissions, session start failures, session end, tab visibility changes, and component unmount without leaving audio, fullscreen, or XR state behind.
- Replace blocking alerts with an inline status message and keep desktop/touch navigation usable.
- Track fullscreen changes from the browser event so the HUD stays accurate when the user exits via browser controls.

### 2. Add headset-first interaction

- Add controller or gaze ray selection for stations and project pedestals, with clear hover/selected feedback.
- Use teleport destinations for movement and preserve the current camera overview/reset behavior.
- Put essential navigation and exit controls within comfortable reach and avoid relying on DOM-only controls while immersed.
- Keep focusable DOM controls, labels, keyboard operation, reduced-motion behavior, and a muted-by-default audio option for non-XR users.

### 3. Improve comfort and performance

- Test on representative standalone headsets and mobile browsers; tune resolution, draw calls, lighting, particles, and model complexity to hold a stable frame rate.
- Reduce automatic camera rotation and provide a stationary starting view; avoid forced motion, flashing, and excessive visual clutter.
- Provide a quality fallback for devices that cannot sustain the full scene and honor reduced-motion preferences.
- Verify safe-area and responsive HUD layout on narrow screens.

### 4. Finish content and release

- Confirm project names, descriptions, images, destinations, and contact details against the portfolio source of truth.
- Add loading, unsupported-device, and session-error states with a way back to the regular page.
- Check WebXR over HTTPS on supported devices, plus desktop mouse, keyboard, touch, screen-reader labels, and link behavior.
- Add a small set of usage events only if analytics is already configured: gallery opened, destination selected, project link opened, and session ended. Do not collect headset or motion data.

## Acceptance criteria

- Desktop and mobile visitors can enter, navigate, inspect content, follow project links, and exit without a headset.
- A supported headset enters the same portfolio scene, allows visitors to select destinations and projects, and ends cleanly back at the site.
- Unsupported devices and failed XR requests receive a clear explanation and retain the non-XR gallery.
- Controls are operable without a mouse, labeled for assistive technology, and do not force camera movement or audio.
- The scene remains stable on target devices and recovers from XR session end, tab switching, and overlay close.

## Suggested first delivery

Complete Phase 1, then validate it on one desktop browser and one WebXR-capable headset. Ship headset controls and performance tuning as the next milestone after the session lifecycle works reliably.
