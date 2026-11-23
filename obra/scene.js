(() => {
  const clamp = value => Math.min(1, Math.max(0, value));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, value) => {
    const t = clamp((value - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const concrete = [169, 155, 133];
  const paleConcrete = [200, 184, 156];
  const sandstone = [234, 206, 167];
  const limed = [231, 214, 186];
  const oak = [157, 97, 47];
  const aluminium = [49, 48, 39];
  const glazing = [67, 84, 77];
  const brick = [187, 151, 110];
  const graphite = [51, 71, 59];
  const copper = [168, 81, 46];
  const parts = [];
  const foundation = {min: [-5.38, -.29, -.35], max: [5.45, 5.17, -.12]};
  const slab = {min: [-5.18, -.13, -.13], max: [5.24, 4.93, .06]};
  const groundColumns = [4.56, .04].flatMap(y =>
    [-5.03, -1.06, .86, 4.84].map((x, i) => ({
      min: [x, y, .06], max: [x + .33, y + .34, 2.70],
      delay: i * .016 + (y > 1 ? 0 : .027)
    })));
  const groundWalls = [
    {min: [-5.03, 4.64, .06], max: [4.91, 4.90, 2.53]},
    {min: [4.91, .36, .06], max: [5.17, 4.71, 2.53]},
    {min: [-5.13, .38, .06], max: [-4.92, 4.64, 2.53]},
    {min: [-1.08, .39, .06], max: [-.94, 2.64, 2.53]},
    {min: [-1.08, 3.47, .06], max: [-.94, 4.64, 2.53]},
    {min: [1.71, 3.32, .06], max: [4.91, 3.48, 2.53]},
    {min: [-4.92, 2.64, .06], max: [-.94, 2.79, 2.53]}
  ];
  const frontWall = {min: [-5.07, .08, .08], max: [-1.08, .38, 2.63]};
  const lightSlot = {min: [-4.46, -.012, 1.21], max: [-1.75, .14, 1.75]};
  const entrance = {min: [-1.06, -.10, .07], max: [.78, .09, 2.58]};
  const mainGlazing = {min: [.88, -.009, .10], max: [4.90, .13, 2.58]};

  function piece(min, max, color, start, end, motion = 'rise', offset = [0, 0, 0]) {
    parts.push({min, max, color, start, end, motion, offset});
  }

  piece(foundation.min, foundation.max, paleConcrete, .11, .22);
  piece(slab.min, slab.max, concrete, .16, .255);
  piece([-5.62, -.57, -.06], [5.60, -.23, .055], limed, .79, .87, 'slide', [0, -.65, 0]);

  for (const {min, max, delay} of groundColumns) {
    piece(min, max, concrete, .25 + delay, .38 + delay);
  }

  for (let row = 0; row < 9; row++) {
    for (let i = 0; i < 7; i++) {
      const x = frontWall.min[0] + i * .55 + (row % 2) * .18;
      const z = frontWall.min[2] + row * .284;
      if (x + .22 > lightSlot.min[0] && x + .22 < lightSlot.max[0] && row >= 4 && row <= 5) continue;
      if (x > -1.42) continue;
      const tint = (i * 7 + row * 11) % 13 - 6;
      piece([x, frontWall.min[1], z], [Math.min(x + .535, frontWall.max[0]), frontWall.max[1], z + .270], brick.map(c => c + tint),
        .33 + row * .014 + i * .003, .405 + row * .014 + i * .003);
    }
  }

  for (const [index, wall] of groundWalls.entries()) {
    for (let row = 0; row < 7; row++) {
      const z = wall.min[2] + row * .353;
      piece([wall.min[0], wall.min[1], z], [wall.max[0], wall.max[1], Math.min(wall.max[2], z + .345)],
        index === 1 ? brick : paleConcrete, .335 + row * .017 + index * .012, .418 + row * .015 + index * .012);
    }
  }

  piece([-5.20, -.12, 2.53], [5.29, 5.08, 2.85], paleConcrete, .365, .54, 'slide', [-2.5, .25, 1.30]);
  piece([-1.28, -.34, 2.75], [5.35, 5.12, 3.02], concrete, .48, .61, 'slide', [1.36, .32, .91]);

  for (const y of [4.63, -.12]) {
    for (const [i, x] of [-1.21, .95, 3.36, 5.00].entries()) {
      const delay = i * .011 + (y > 1 ? 0 : .022);
      piece([x, y, 3.01], [x + .29, y + .32, 5.34], concrete, .50 + delay, .635 + delay);
    }
  }

  piece([-1.37, -.34, 5.28], [5.36, 5.10, 5.58], paleConcrete, .55, .705, 'slide', [2.38, .30, 1.54]);
  piece([5.13, .23, 3.02], [5.34, 4.95, 5.31], paleConcrete, .59, .73, 'slide', [1.40, .4, .25]);
  piece([-1.12, 4.75, 3.02], [5.22, 4.98, 5.31], paleConcrete, .59, .72);
  piece([-.99, .09, 2.95], [5.10, .23, 5.34], glazing, .681, .82, 'slide', [0, .03, 1.24]);
  piece([-.88, .03, 3.08], [4.96, .10, 4.27], [87, 96, 83], .691, .828, 'slide', [0, .03, 1.24]);
  piece(mainGlazing.min, mainGlazing.max, glazing, .678, .836, 'slide', [0, 0, 1.42]);
  piece([.91, -.016, .15], [4.88, .07, 1.21], [87, 100, 87], .692, .842, 'slide', [0, 0, 1.42]);
  piece(lightSlot.min, lightSlot.max, aluminium, .685, .811, 'slide', [-.62, -.32, .2]);
  piece(entrance.min, entrance.max, oak, .711, .824, 'slide', [-1.02, -.68, .12]);

  for (const x of [-5.10, -1.16]) {
    piece([x, -.055, .08], [x + .12, .11, 2.55], sandstone, .713, .82, 'slide', [x < -3 ? -1 : -.45, -.37, .10]);
  }
  for (let row = 0; row < 11; row++) {
    for (let i = 0; i < 7; i++) {
      const x = -5.05 + i * .56;
      const z = .09 + row * .224;
      if (x + .26 > -4.50 && x + .26 < -1.65 && row >= 5 && row <= 7) continue;
      const delay = row * .0025 + i * .0045;
      const tint = (i * 3 + row * 5) % 11 - 5;
      piece([x, -.040, z], [x + .55, .10, z + .217], sandstone.map(c => c + tint), .68 + delay, .77 + delay, 'slide', [-.26, -.53, .26]);
    }
  }

  piece([-5.21, -.15, 2.55], [-1.18, .09, 2.87], sandstone, .73, .834, 'slide', [-1.45, -.23, .22]);
  piece([-1.40, -.37, 2.76], [5.38, -.10, 3.07], sandstone, .732, .855, 'slide', [1.20, -.27, -.13]);
  piece([-1.40, -.37, 5.31], [5.38, -.10, 5.61], sandstone, .739, .857, 'slide', [1.30, -.44, .40]);
  piece([-1.40, -.37, 3.03], [-1.08, -.10, 5.37], sandstone, .74, .864, 'slide', [-1.21, -.29, .35]);
  piece([5.04, -.37, 3.035], [5.38, -.10, 5.37], sandstone, .752, .872, 'slide', [1.42, -.27, .32]);
  piece([5.26, .21, 2.92], [5.40, 5.10, 5.56], sandstone, .751, .867, 'slide', [1.26, .35, .24]);
  piece([5.17, .22, .08], [5.31, 4.98, 2.55], sandstone, .737, .864, 'slide', [1.00, .37, .16]);
  piece([.70, -.16, .07], [.94, .04, 2.58], sandstone, .738, .864, 'slide', [-.4, -.3, .36]);
  piece([4.91, -.17, .07], [5.22, .05, 2.57], sandstone, .738, .867, 'slide', [.75, -.25, .2]);

  for (let i = 0; i < 15; i++) {
    const x = 3.37 + i * .106;
    const delay = i * .0027;
    piece([x, -.261, 3.07], [x + .048, -.14, 5.32], oak.map(c => c + i % 3 * 7), .714 + delay, .81 + delay, 'slide', [1.04 + i * .05, -.46, .43 + i * .06]);
  }
  for (let i = 0; i < 12; i++) {
    const x = -.99 + i * .134;
    piece([x, -.154, .06], [x + .025, -.12, 2.56], [113, 66, 32], .739 + i * .003, .825 + i * .003, 'slide', [-.35, -.40, .20]);
  }
  for (const x of [1.00, 2.30, 3.58, 4.90]) {
    piece([x, -.044, .10], [x + .058, .018, 2.58], aluminium, .74, .836, 'slide', [0, -.04, 1.42]);
  }
  for (const x of [-1.03, .86, 3.31]) {
    piece([x, -.086, 3.05], [x + .055, -.034, 5.31], aluminium, .752, .85, 'slide', [0, -.1, .78]);
  }
  for (let i = 1; i <= 3; i++) {
    piece([-.74, -.44 - i * .31, -.25], [1.31, -.13 - i * .31, .04 - i * .055], limed, .754 + i * .018, .846 + i * .016, 'slide', [0, -.63 - i * .16, -.1]);
  }
  for (let row = 0; row < 6; row++) {
    for (const [index, [left, right]] of [[-1.38,5.35],[-5.20,-1.37]].entries()) {
      if (index === 1 && row > 2) continue;
      const z = index ? 2.55 + row * .10 : 5.32 + row * .045;
      for (let x = left; x < right - .2; x += .62) {
        const shade = Math.round(5 * Math.sin((x + row) * 9));
        piece([x, index ? -.155 : -.376, z], [Math.min(x + .609,right), index ? -.14 : -.367, z + (index ? .094 : .041)],
          sandstone.map(c => c + shade), .81 + row * .0027, .906 + row * .004, 'slide', [0, -.12, .05]);
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    piece([-.46, -2.12 - i * .49, -.39], [1.15, -1.68 - i * .49, -.31], limed, .867 + i * .013, .918 + i * .013, 'slide', [0, -.50, -.06]);
  }

  const faces = [
    {corners:[0,1,2,3], normal:[0,0,-1], shade:.78},
    {corners:[0,1,5,4], normal:[0,-1,0], shade:1.02},
    {corners:[1,2,6,5], normal:[1,0,0], shade:.78},
    {corners:[2,3,7,6], normal:[0,1,0], shade:.72},
    {corners:[3,0,4,7], normal:[-1,0,0], shade:.90},
    {corners:[4,5,6,7], normal:[0,0,1], shade:1.10},
  ];
  function footprint({min, max}) {
    return [[min[0],min[1]],[max[0],min[1]],[max[0],max[1]],[min[0],max[1]],[min[0],min[1]]];
  }

  const planPaths = [
    {points: footprint(foundation), type: 'foundation', drop: .089, land: -.115},
    {points: footprint(slab), type: 'slab', drop: .101, land: .071},
    ...[frontWall, ...groundWalls].map((wall, i) => ({points: footprint(wall), type: 'wall', drop: .121 + i * .006, land: .08})),
    ...groundColumns.map((column, i) => ({points: footprint(column), type: 'column', drop: .154 + i * .004, land: .084})),
    ...[lightSlot, entrance, mainGlazing].map((opening, i) => ({
      points: footprint(opening), type: 'opening', drop: .172 + i * .011, land: .085
    })),
  ];
  const paperElevation = 2.64;
  const paperCorners = [[-6.28,-1.28],[6.28,-1.28],[6.28,6.23],[-6.28,6.23]];
  const colors = {
    light: [245,239,226],
    paper: [250,247,231],
    sky: [220,230,220],
    studioGround: [213,207,186],
    completedGround: [200,195,161]
  };

  function color(rgb, alpha = 1, shade = 1) {
    return 'rgba(' + rgb.map(v => Math.min(255, Math.round(v * shade))).join(',') + ',' + alpha + ')';
  }

  function blend(a, b, t) {
    return a.map((value, index) => mix(value, b[index], t));
  }

  function scene(canvas) {
    const ctx = canvas.getContext('2d');
    const metres = new Intl.NumberFormat(document.documentElement.lang, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const planWidth = metres.format(10.83) + ' m';
    const planLength = metres.format(5.46) + ' m';
    if (!ctx) return null;
    let width = 0;
    let height = 0;
    let resolution = 1;
    let last = -1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.65);
      if (rect.width === width && rect.height === height && ratio === resolution) return;
      width = rect.width;
      height = rect.height;
      resolution = ratio;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      last = -1;
    }

    function draw(progress) {
      if (!width || !height || progress === last) return;
      last = progress;
      ctx.setTransform(resolution, 0, 0, resolution, 0, 0);
      const cameraTurn = smooth(.044, .49, progress);
      const finishing = smooth(.69, 1, progress);
      const construction = clamp((progress - .155) / .80);
      const photoPose = smooth(.79,.985,progress);
      const yaw = mix(mix(.075, .34, cameraTurn) + .10 * finishing, .10, photoPose);
      const elevation = mix(mix(1.33, .40, cameraTurn) - .11 * finishing, .075, photoPose);
      const sy = Math.sin(yaw);
      const cy = Math.cos(yaw);
      const se = Math.sin(elevation);
      const ce = Math.cos(elevation);
      const direction = [sy * ce, -cy * ce, se];
      const cameraHeight = mix(2.68, 2.17, cameraTurn) + .30 * finishing;
      const cameraDepth = mix(2.51, 2.18, cameraTurn) - .55 * finishing;
      const scale = Math.min(width / mix(mix(14.9, 14.6, cameraTurn),13,photoPose), height / mix(mix(9.05, 8.16, cameraTurn),8.35,photoPose));
      const centerY = height * mix(mix(.48, .52, cameraTurn),.46,photoPose);
      const centerX = width * mix(.49,.493,photoPose);

      function project([x, y, z]) {
        y -= cameraDepth;
        z -= cameraHeight;
        const depth = x * direction[0] + y * direction[1] + z * direction[2];
        const perspective = 1 / Math.max(.50, 1 - .015 * depth);
        return [
          centerX + (x * cy + y * sy) * scale * perspective,
          centerY - (-x * sy * se + y * cy * se + z * ce) * scale * perspective * mix(1,.90,photoPose),
          depth
        ];
      }

      function path(points, closed = false) {
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
        if (closed) ctx.closePath();
      }

      function footprintAt(points, z, dx = 0, dy = 0) {
        return points.map(([x, y]) => project([x + dx, y + dy, z]));
      }

      function lineAt(points, z, rgb, alpha, weight, dx = 0, dy = 0) {
        if (alpha <= 0) return;
        path(footprintAt(points, z, dx, dy));
        ctx.strokeStyle = color(rgb, alpha);
        ctx.lineWidth = weight;
        ctx.stroke();
      }

      const background = ctx.createLinearGradient(0, 0, width * .55, height);
      background.addColorStop(0, color(blend(colors.light, colors.sky, finishing)));
      background.addColorStop(.63, color(blend([237,232,213],[227,225,204],finishing)));
      background.addColorStop(1, color(blend(colors.studioGround,colors.completedGround,finishing)));
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const sun = ctx.createRadialGradient(width * .36, height * .27, 0, width * .36, height * .27, Math.max(width,height) * .66);
      sun.addColorStop(0, '#fffaf1b0');
      sun.addColorStop(1, '#fffaf100');
      ctx.fillStyle = sun;
      ctx.fillRect(0,0,width,height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const yard = smooth(.215, .96, progress);
      path(footprintAt([[-8.1,-4.2],[7.6,-4.2],[7.6,7.7],[-8.1,7.7]],-.397),true);
      ctx.fillStyle = color(blend([173,162,128],[154,154,110],finishing),yard*.36);
      ctx.fill();

      for (let x = -13; x <= 13; x++) {
        lineAt([[x,-6],[x,13]],-.393,graphite,(x%3===0?.15:.075)*(1-finishing*.91),.74);
      }
      for (let y = -7; y <= 13; y++) {
        lineAt([[-13,y],[13,y]],-.393,graphite,(y%3===0?.15:.075)*(1-finishing*.91),.74);
      }

      const buildingShadow = [[-5.57,-.27],[5.43,-.27],[7.50,2.36],[7.50,6.33],[-4.38,5.61]];
      path(footprintAt(buildingShadow,-.39),true);
      ctx.shadowColor = color([67,54,36],yard*.25);
      ctx.shadowBlur = 12;
      ctx.fillStyle = color([90,76,54],yard*.19);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      const garden = smooth(.855, .998, progress);
      if (garden > .006) {
        const locations = [[-6.5,3.34,.94],[6.48,5.61,.72],[6.44,2.4,.76],[-6.3,-.54,.62]];
        for (const [x,y,size] of locations) {
          const foot = project([x,y,-.38]);
          const branch = project([x-.07,y+.06,1.23*size]);
          ctx.globalAlpha = garden;
          path([foot, branch]);
          ctx.strokeStyle = '#746049';
          ctx.lineWidth = Math.max(1.4,width*.007*size);
          ctx.stroke();
          for (let i=0;i<16;i++) {
            const a = i * 2.39996;
            const spread = Math.sqrt(i/16) * .62;
            const p = project([x+Math.cos(a)*spread*size,y+Math.sin(a)*spread*size,(1.39 + .43 * Math.cos(a))*size]);
            const radius = Math.max(3,width*.027*size*(.65+(i%5)*.08));
            const leaf = ctx.createRadialGradient(p[0]-radius*.19,p[1]-radius*.28,radius*.16,p[0],p[1],radius);
            leaf.addColorStop(0, i%2 ? '#9a9f72' : '#a9ab7a');
            leaf.addColorStop(.66, i%2 ? '#6f7b50' : '#80895b');
            leaf.addColorStop(1,'#68734b23');
            ctx.beginPath();
            ctx.ellipse(p[0],p[1],radius,radius*.64,-.2,0,Math.PI*2);
            ctx.fillStyle = leaf;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
        for (let i=0;i<29;i++) {
          const x = (i%2?1:-1)*(1.75+(i%7)*.61);
          const y = -1.70 - (i%4)*.40 + Math.sin(i*6)*.14;
          const foot = project([x,y,-.385]);
          const tip = project([x + Math.sin(i)*.15,y+.08,-.20+(i%3)*.065]);
          path([foot,tip]);
          ctx.lineWidth = width > 600 ? 1.45 : .85;
          ctx.strokeStyle = color(i%2?[117,113,70]:[160,144,94],garden*.72);
          ctx.stroke();
        }
      }

      const paperOpacity = 1 - smooth(.185, .315, progress);
      const paperX = -.95 * smooth(.182, .32, progress);
      const paperZ = paperElevation + .22 * smooth(.21,.34,progress);
      if (paperOpacity > .005) {
        const paper = footprintAt(paperCorners,paperZ,paperX,0);
        path(paper,true);
        ctx.shadowColor = color([111,89,56],paperOpacity*.23);
        ctx.shadowOffsetY = 12;
        ctx.shadowBlur = 21;
        ctx.fillStyle = color(colors.paper,paperOpacity);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1;
        ctx.strokeStyle = color([146,133,103],paperOpacity*.24);
        ctx.stroke();
        ctx.save();
        ctx.clip();
        for (let x = -6; x <= 6; x+=.5) {
          lineAt([[x,-1.28],[x,6.23]],paperZ,graphite,paperOpacity*(x%1===0?.145:.06),.75,paperX,0);
        }
        for (let y = -1; y <= 6; y+=.5) {
          lineAt([[-6.28,y],[6.28,y]],paperZ,graphite,paperOpacity*(y%1===0?.145:.06),.75,paperX,0);
        }
        ctx.restore();
        const widthMeasure = [[foundation.min[0],-.82],[foundation.max[0],-.82]];
        const lengthMeasure = [[5.94,foundation.min[1]],[5.94,foundation.max[1]]];
        lineAt(widthMeasure,paperZ,graphite,paperOpacity*.58,.9,paperX,0);
        lineAt(lengthMeasure,paperZ,graphite,paperOpacity*.58,.9,paperX,0);
        for (const [x,y] of [...widthMeasure,...lengthMeasure]) {
          lineAt([[x-.08,y-.08],[x+.08,y+.08]],paperZ,graphite,paperOpacity*.79,1.1,paperX,0);
        }
        const mark = project([paperX,-1.01,paperZ]);
        const sideMark = project([5.98+paperX,2.48,paperZ]);
        const planLabel = project([-5.2+paperX,5.74,paperZ]);
        ctx.font = (width > 580 ? 12 : 9) + 'px ui-monospace, monospace';
        ctx.fillStyle = color(graphite,.86*paperOpacity);
        ctx.textAlign = 'center';
        ctx.fillText(planWidth,mark[0],mark[1]);
        ctx.save();
        ctx.translate(sideMark[0]+5,sideMark[1]);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(planLength,0,0);
        ctx.restore();
        ctx.textAlign = 'left';
        ctx.fillText(canvas.dataset.floorLabel,planLabel[0],planLabel[1]);
      }

      const surfaces = [];
      for (const part of parts) {
        const amount = smooth(part.start, part.end, construction);
        if (amount < .003) continue;
        const [x1,y1,z1] = part.min;
        const [x2,y2,z2] = part.max;
        const top = part.motion === 'rise' ? mix(z1 + .013, z2, amount) : z2;
        const dx = part.offset[0] * (1 - amount);
        const dy = part.offset[1] * (1 - amount);
        const dz = part.offset[2] * (1 - amount);
        const vertices = [
          [x1+dx,y1+dy,z1+dz],[x2+dx,y1+dy,z1+dz],[x2+dx,y2+dy,z1+dz],[x1+dx,y2+dy,z1+dz],
          [x1+dx,y1+dy,top+dz],[x2+dx,y1+dy,top+dz],[x2+dx,y2+dy,top+dz],[x1+dx,y2+dy,top+dz]
        ].map(project);
        for (const face of faces) {
          if (face.normal.reduce((dot, value, i) => dot + value * direction[i], 0) < .005) continue;
          const points = face.corners.map(index => vertices[index]);
          const depth = points.reduce((sum, point) => sum + point[2], 0) / 4;
          surfaces.push({points, depth, shade:face.shade, rgb:part.color, opacity:smooth(0,.21,amount)});
        }
      }
      surfaces.sort((a,b) => a.depth - b.depth);
      ctx.lineWidth = width > 540 ? .67 : .50;
      for (const surface of surfaces) {
        path(surface.points, true);
        const y = surface.points.map(p => p[1]);
        const top = Math.min(...y);
        const bottom = Math.max(...y);
        const fill = ctx.createLinearGradient(0,top,0,Math.max(top+.8,bottom));
        fill.addColorStop(0, color(surface.rgb,surface.opacity,surface.shade*1.032));
        fill.addColorStop(1, color(surface.rgb,surface.opacity,surface.shade*.955));
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = color([76,61,43],surface.opacity*.20);
        ctx.stroke();
      }

      for (const [i, plan] of planPaths.entries()) {
        const lift = smooth(plan.drop - .038,plan.drop,progress);
        const drop = smooth(plan.drop,plan.drop + .113,progress);
        const ink = plan.type === 'foundation' ? copper : graphite;
        const lineWidth = plan.type === 'foundation' ? Math.max(1.3,width*.0023) : Math.max(.82,width*.0018);
        const leave = smooth(plan.drop-.018,plan.drop+.028,progress);
        lineAt(plan.points,paperZ,ink,paperOpacity*(1-leave)*.95,lineWidth,paperX,0);
        if (lift <= .005) continue;
        const heightAbove = mix(paperElevation + lift * (.31 + i * .012),plan.land,drop);
        const landOpacity = plan.type === 'foundation' || plan.type === 'slab'
          ? 1 - smooth(.31,.44,progress) : 1 - smooth(.45,.605,progress);
        const alpha = smooth(.07,.59,lift)*landOpacity;
        if (alpha <= .001) continue;
        if (drop > .015 && drop < .985) {
          for (const [x,y] of plan.points.slice(0,4).filter((_, index) => index % 2 === 0)) {
            const a = project([x,y,heightAbove]);
            const b = project([x,y,plan.land]);
            path([a,b]);
            ctx.strokeStyle = color(copper,Math.sin(Math.PI*drop)*.26);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        lineAt(plan.points, heightAbove, copper,alpha*.96,lineWidth+(.22*lift));
      }

      for (const {min, max, delay} of groundColumns) {
        const trace = smooth(.19+delay,.36+delay,construction);
        const fade = 1 - smooth(.32+delay,.43+delay,construction);
        if (trace * fade < .005) continue;
        for (const x of [min[0],max[0]]) {
          path([project([x,min[1],min[2]]),project([x,min[1],mix(min[2],max[2],trace)])]);
          ctx.lineWidth = Math.max(1,width*.0018);
          ctx.strokeStyle = color(copper, fade*.86);
          ctx.stroke();
        }
      }
    }

    return {resize, draw};
  }

  window.createCimentaScene = scene;
})();
