class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;

        this.circlepoints = [];
        this.curve = [];
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }


    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.curve = [];
        this.drawBezierCurve({x:100, y:100},{x:200, y:150},{x:300, y:50},{x:400, y:100}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.curve.length; i++){
                this.drawVertex(this.curve[i], [0,0,255,255], framebuffer);
            }
        }
        this.curve = [];
        this.drawBezierCurve({x:100, y:400},{x:200, y:800},{x:300, y:0},{x:400, y:400}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.curve.length; i++){
                this.drawVertex(this.curve[i], [0,0,255,255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.circlepoints = []
        this.drawCircle({x:400, y:300}, 100, this.num_curve_sections,  [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.circlepoints.length; i++){
                this.drawVertex(this.circlepoints[i], [0,0,255,255], framebuffer);
            }
        }
        this.circlepoints = []
        this.drawCircle({x:600, y:100}, 100, this.num_curve_sections,  [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.circlepoints.length; i++){
                this.drawVertex(this.circlepoints[i], [0,0,255,255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let vertex_list =[{x: 200, y: 300},{x: 400, y: 250},{x: 600, y: 300},{x: 600, y: 450},{x: 400, y: 500},{x: 200, y: 450}];
        this.drawConvexPolygon(vertex_list, [255, 0, 0, 255],framebuffer);
        if(this.show_points){
            for (let i = 0; i<vertex_list.length; i++){
                this.drawVertex(vertex_list[i], [0,0,255,255], framebuffer);
            }
        }
        let vertex_list1 =[{x: 200, y: 100},{x: 400, y: 75},{x: 600, y: 85},{x: 600, y: 115},{x: 400, y: 125}];
        this.drawConvexPolygon(vertex_list1, [255, 0, 0, 255],framebuffer);
        if(this.show_points){
            for (let i = 0; i<vertex_list1.length; i++){
                this.drawVertex(vertex_list1[i], [0,0,255,255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.curve = [];
        this.drawBezierCurve({x:100, y:200},{x:100, y:600},{x:200, y:0},{x:200, y:400}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.curve.length; i++){
                this.drawVertex(this.curve[i], [0,0,255,255], framebuffer);
            }
        }
        
        this.circlepoints = []
        this.drawCircle({x:300, y:300}, 50, this.num_curve_sections,  [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.circlepoints.length; i++){
                this.drawVertex(this.circlepoints[i], [0,0,255,255], framebuffer);
            }
        }

        this.circlepoints = []
        this.drawCircle({x:500, y:300}, 50, this.num_curve_sections,  [255, 0, 0, 255], framebuffer);
        if(this.show_points){
            for (let i = 0; i<this.circlepoints.length; i++){
                this.drawVertex(this.circlepoints[i], [0,0,255,255], framebuffer);
            }
        }

        let line0 = {x: 550, y: 350}
        let line1 = {x: 550, y: 250}
        this.drawLine(line0, line1, [255,0,0,255], framebuffer)
        if(this.show_points){
            this.drawVertex(line0, [0,0,255,255], framebuffer);
            this.drawVertex(line1, [0,0,255,255], framebuffer);
        }

        let vertex_list =[{x: 650, y: 250},{x: 675, y: 250},{x: 675, y: 350},{x: 650, y: 350}];
        this.drawConvexPolygon(vertex_list, [255, 0, 0, 255],framebuffer);
        if(this.show_points){
            for (let i = 0; i<vertex_list.length; i++){
                this.drawVertex(vertex_list[i], [0,0,255,255], framebuffer);
            }
        }
        let vertex_list1 =[{x: 750, y: 250},{x: 725, y: 250},{x: 725, y: 350},{x: 750, y: 350}];
        this.drawConvexPolygon(vertex_list1, [255, 0, 0, 255],framebuffer);
        if(this.show_points){
            for (let i = 0; i<vertex_list1.length; i++){
                this.drawVertex(vertex_list1[i], [0,0,255,255], framebuffer);
            }
        }
        let vertex_list2 =[{x: 650, y: 290},{x: 750, y: 290},{x: 750, y: 310},{x: 650, y: 310}];
        this.drawConvexPolygon(vertex_list2, [255, 0, 0, 255],framebuffer);
        if(this.show_points){
            for (let i = 0; i<vertex_list2.length; i++){
                this.drawVertex(vertex_list2[i], [0,0,255,255], framebuffer);
            }
        }


    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let prevx = p0.x;
        let prevy = p0.y;
        this.curve.push({x: p0.x, y: p0.y})
        for(let t = 1/num_edges; t<=1; t += 1/num_edges){
            let x = (1-t)**3*p0.x + 3*(1-t)**2*t*p1.x + 3*(1-t)*t**2*p2.x + t**3*p3.x;
            let y = (1-t)**3*p0.y + 3*(1-t)**2*t*p1.y + 3*(1-t)*t**2*p2.y + t**3*p3.y;
            this.curve.push({x: parseInt(x), y: parseInt(y)})
            prevx = x;
            prevy = y;
            
        }

        for(let i = 0; i < this.curve.length-1; i++){
            this.drawLine(this.curve[i], this.curve[i+1], color, framebuffer)
        }   
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        for (let i = 0; i < num_edges; i++) {
            let angle = 2 * Math.PI * i / num_edges;
            let cx = center.x + radius * Math.cos(angle);
            let cy = center.y + radius * Math.sin(angle);
            this.circlepoints.push({x: parseInt(cx), y: parseInt(cy)});
        }
        console.log(this.circlepoints);
        for (let i = 0; i<this.circlepoints.length-1; i++){
            let cp0 = this.circlepoints[i];
            let cp1 = this.circlepoints[i+1];
            this.drawLine(cp0, cp1, color, framebuffer);
        }
        this.drawLine(this.circlepoints[0],this.circlepoints[this.circlepoints.length-1], color, framebuffer)
    }
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for(let i = 1; i<vertex_list.length-1; i++){
            this.drawTriangle(vertex_list[0],vertex_list[i],vertex_list[i+1],color,framebuffer);
        }
        
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        this.drawLine({x:v.x+5 , y: v.y+5},{x:v.x-5 , y: v.y+5}, color,framebuffer);
        this.drawLine({x:v.x-5 , y: v.y+5},{x:v.x-5 , y: v.y-5}, color,framebuffer);
        this.drawLine({x:v.x-5 , y: v.y-5},{x:v.x+5 , y: v.y-5}, color,framebuffer);
        this.drawLine({x:v.x+5 , y: v.y-5},{x:v.x+5 , y: v.y+5}, color,framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
}

