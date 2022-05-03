import { SimpleSurfaceData, SimpleSurfaceMesh } from './surface-data';
import { Peaks } from './math-func';
import { CreateSurfaceWithColormap } from './surface';
import $ from 'jquery';
import "./site.css";

const CreateSurface = async (colormapName: string, meshColor = [1,1,1], isAnimation = true, dy= 0) => {
    const data = SimpleSurfaceData(Peaks, -3, 3, -3, 3, 30, 30, 2, 0, colormapName);
    const mesh = SimpleSurfaceMesh(Peaks, -3, 3, -3, 3, 30, 30, 2, 0,[0,0,0], dy);
    const mesh2 = SimpleSurfaceMesh(Peaks, -3, 3, -3, 3, 30, 30, 2, 0,[0,0,0], -dy)
    await CreateSurfaceWithColormap(data?.vertexData!, data?.normalData!, data?.colorData!, mesh!, mesh2!, meshColor, {}, isAnimation);
}

let isAnimation = true;
let colormapName = 'jet';
let meshColor = [0, 0, 0];
let dy = 0.001;

CreateSurface(colormapName, meshColor, isAnimation, dy);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateSurface(colormapName, meshColor, isAnimation, dy);
});

$('#btn-redraw').on('click', function(){
    meshColor = ($('#id-color').val()?.toString()!).split(',').map(Number);   
    dy = parseFloat($('#id-dy').val()?.toString()!);  
    CreateSurface(colormapName, meshColor, isAnimation, dy);
});

$('#id-colormap').on('change',function(){
    const ele = this as any;
    colormapName = ele.options[ele.selectedIndex].text;
    CreateSurface(colormapName, meshColor, isAnimation, dy);
});

window.addEventListener('resize', function() {
    CreateSurface(colormapName, meshColor, isAnimation, dy);
});