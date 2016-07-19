/* gdivcss.js - Brett Fraley - 2016 */
// CSS function library for Great Divide

 /* Style rule functions for scenes, subscenes, blocks, and subpx */
    // NOTE: Set styles in the main scene that all scenes should inherit.

    // Set width and height dimmensions of the main scene.
    function set_main_size(w, h)
    {
        var el = get_gd_main();
        el.width = el.style.width = w + 'px';
        el.height = el.style.height = h + 'px';
    };

    // Set background or foreground color of main scene, 0 for bg, 1 for fg.
    function set_main_color(bg_or_fg, color)
    {    
        var el = get_gd_main();
        if (bg_or_fg === 0)
        {
            el.bgcolor = el.style.backgroundColor = color;
        }
        else
        {
            el.fgcolor = el.style.color = color;
        }
    };

    function set_scene_size(scene_reference, w, h)
    {
         scene_reference.width = scene_reference.style.width = w + 'px';
         scene_reference.height = scene_reference.style.height = h + 'px';   
    };

    function set_scene_color(scene_reference, bg_or_fg, color) 
    {
        if (bg_or_fg === 0)
        {
            scene_reference.bgcolor = scene_reference.style.backgroundColor = color;
        }
        else
        {
            scene_reference.fgcolor = scene_reference.style.color = color;
        }
    };

    // Set dimmension size for components of a certain type.
    function set_size(component_type, w, h)
    {
        var el = component_type = document.getElementsByClassName(component_type);
        el.style.width = w + 'px';
        el.style.height = h + 'px';
    };

    // Set background or foreground color, 0 for bg, 1 for fg,
    // for ALL components of a certain type.
    function set_color(bg_or_fg, component_type, color)
    {
        var el = component_type = document.getElementsByClassName(component_type);
        el.style.backgroundColor = color;
    };
