/* The Great Divide Web-Game Framework - Brett Fraley - 2016 */

/* Generate, render, and return references to the container components 
   of this framework, named: main, scene, subscene, block, and subpx. */    

// A main scene is always a child of document.body and
// is a global wrapper element.

(function(win, dom)
{
    function new_main_scene()
    { 
        d = document.body;
        main = document.createElement('div');
        d.appendChild(main);
        main.className = 'main';
        main.idName = 'gdmain'
        return main;
    };

// A new scence is always a child of main scene.
    function new_scene(main)
    {
        main = get_gd_main();
        GD_assert(main, 'Failed to reference main scene in call to new_scene')

        scene = document.createElement('div');
        main.appendChild(scene);
        scene.className = 'scene';
        // if args[1] then set idName to user specified id for this scene.
        return scene;
    };

    // A sub scene is always a child of a specified scene.
    function new_subscene(sceneID) // NOTE: Yes, Some scenes need to have IDs.
    {
        scene = document.getElementById(sceneID);
        subscene = document.createElement('div');
        scene.appendChild(subscene);
        subscene.className = 'subscene';
        // if args[1] then set idName to user specified id for this subscene.
        return subscene;
    };

    // A new block optionally accepts a scene name reference,
    // and a boolean whether to fill the block with 5px spans or not.
    function new_block(scene, subpx)
    {  
        if (!scene) { scene = document.body; }

        var block = document.createElement('div');
        scene.appendChild(block);
        block.className = 'block'; 

        if (subpx)
        {
            block.default_subpx = new_subpx(block); // new_subpx defined below.
        }

        return block;
    };

    // Create and append 4 5px spans to a block.      
    function new_subpx(block)
    {
        var loop = 0;
        var rowclass = 'subpx1';

        while(loop < 16) // 16px for a 4x4 px block
        {                
            var subpx = document.createElement('span');
            block.appendChild(subpx);

            if (loop < 4) { subpx.className = rowclass; }
            if (loop >= 4 && loop < 8) { rowclass = 'subpx2'; }
            if (loop >= 8 &&  loop < 12) { rowclass = 'subpx3';}
            if (loop >= 12 && loop < 16) { rowclass = 'subpx4'; }

            subpx.className = rowclass; 
            loop += 1;        
        }

        return subpx;
    };

    /* Functions to get at scenes, subscenes, blocks, and subpx. */

    function get_gd_main()
    {
        return get_gd_component(0, 'main')[0];    
    };

    function get_allscenes()
    {
        return get_gd_component(0, 'scene');    
    };

    function get_allsubscenes()
    {
        return get_gd_component(0, 'subscene');    
    };

    function get_allblocks()
    {
        return get_gd_component(0, 'block');    
    };

    function get_allsubpxs()
    {
        return get_gd_component(0, 'subpx');    
    };

    // Get elements by class or ID.
    // requires arguments: [0 for class or 1 for id, class or id name]

    function get_gd_component(class_or_id, name)
    {
        if (class_or_id == 0)
        {
            return document.getElementsByClassName(name);
        }
        else if (class_or_id == 1)
        {    
            return document.getElementById(name);   
        }
        else
        {
            throw Error('bad argument supplied to get_gd_component');           
        }
    };

    // Get a specific component element at a known index.
    function get_gd_component_byindex(list, index)
    {
        var result;

        if (index < list.length)
        {
            result = list[index];        
        }
        else
        {
            throw Error('get_gd_component_byindex: index larger than list length');
            return;
        }

        if (result === null || result === undefined)
        {
            throw Error('get_gd_component_byindex: result null or undefined');
            components.style.width = w = 'px';
            components.style.height = h + 'px';turn;
        }
        else
        {
            return result;
        }
    };

    /* These are various loop generation functions. */

    // Iterate over static sized, or dynamic sized array of a specific component
    // type and call a list of functions on each component element.
    // (all scenes, subscenes, blocks, or subpxs)

    function loop_gd_static_component_list(component_reference)
    {
        var length = component_reference.length; 
        var last = component_reference[length - 1];    
        var function_counter = arguments.length - 1;

        // ( i ) could prove useful defined here outside of for loop.
        var i = 0;
        for (i; i <= last; i++)
        {        
            while(function_counter > 0)
            {
                arguments[function_counter](component_reference[i]);      
                function_counter--;                       
            }       
        }   
    };

    // Note: Use when it's known or possible that the list length and index values
    // may change since the query and assignment of a given type of component list.

    function loop_gd_dynamic_component_list(component_reference)
    {
        var length = component_reference.length;    
        var last = component_reference.last;
        var function_counter = arguments.length - 1;

        // Copy initial state of current component array (current_reference).
        var current_reference = component_reference;

        // Loop
        var i = 0;    
        for (i; i <= last; i++)
        {
            while(function_counter > 0)
            {           
                arguments[function_counter](current_reference[i]);
                function_counter -= 1;
            }

            // There could be more or less of this type of component now,
            // and we want the function list to act on each of them.

            current_reference = get_gd_component(0, component_reference[0].className);

            // Check lengths for change.            
            if (current_reference.length !== length)  
            {
                length = current_reference.length;     // update length
                last = current_reference[length - 1];  // update last index              
            }
        }
    };

   

    // Add a className to a component(s)
    function set_added_class(component_reference, classname)
    {
        // If it's an array of elements.
        if (component_reference.length > 1)
        {
            component_reference.forEach(function(each)
            {
                each.addClassName(classname);            
            });
        }
        else // Assuming here it's a single element.
        {
            component_reference.addClassName(classname);
        }
    };

    // Add an idName to a component. IDs should only have one instance.
    function set_id (component_reference, idname)
    {
        component_reference.style.idName = idname;
    };

    // Functions to automatically spawn great divide components.
    function spawnblocks(scene, amount, w, h, bgcolor, fgcolor)
    {
         var i = 0;
         scene.blocks = [];

        while (i < amount)
        {
            scene.blocks.push(new_block(scene));
            set_size('block', w, h);
            set_color(0, bgcolor);
            set_color(1, fgcolor);

            i++;
        }
    };

    // Attach functions to gdiv object.
    // Then attach gdiv to window.
    var gdiv = {
        main: new_main_scene,
        scene: new_scene,
        subscene: new_subscene,
        block: new_block,
        subpx: new_subpx 
    };
    
    return win.gdiv = gdiv;
    
})(window, document);



   