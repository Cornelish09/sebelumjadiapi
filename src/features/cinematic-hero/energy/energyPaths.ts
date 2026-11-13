export type ImagePoint = readonly [number, number]
export interface EnergyPath {
  id: string
  kind: 'root' | 'trunk' | 'branch' | 'twig'
  points: readonly ImagePoint[]
  width: number
  parent?: string
}

// Koordinat gambar asli: kiri atas (0,0), kanan bawah (1,1).
// Dikalibrasi terhadap tree-layer.webp, BUKAN model procedural lama.
const junction: ImagePoint = [0.646, 0.438]
export const energyPaths: readonly EnergyPath[] = [
  { id:'root-west-upper',kind:'root',width:.0012,points:[[.14,.889],[.27,.80],[.40,.72],[.52,.65],[.592,.54],junction] },
  { id:'root-west-middle',kind:'root',width:.0013,points:[[.195,.974],[.32,.865],[.44,.805],[.535,.71],[.602,.565],junction] },
  { id:'root-front-ridge',kind:'root',width:.0014,points:[[.701,.985],[.693,.895],[.679,.797],[.659,.694],[.65,.576],junction] },
  { id:'root-front-fissure',kind:'root',width:.0007,points:[[.643,.96],[.651,.87],[.65,.787],[.635,.68],[.637,.555],junction] },
  { id:'root-east-front',kind:'root',width:.0012,points:[[.862,.973],[.795,.913],[.743,.831],[.70,.719],[.685,.60],[.667,.496],junction] },
  { id:'root-east-upper',kind:'root',width:.0012,points:[[.993,.655],[.913,.631],[.828,.607],[.76,.562],[.71,.494],[.681,.433]] },
  { id:'root-east-mid',kind:'root',width:.0011,points:[[.992,.829],[.902,.779],[.83,.735],[.77,.661],[.717,.563],[.676,.472],junction] },
  { id:'trunk-west',kind:'trunk',width:.0013,parent:'root-west-upper',points:[junction,[.628,.354],[.632,.263],[.641,.159],[.641,.059],[.648,.0]] },
  { id:'trunk-center',kind:'trunk',width:.0014,parent:'root-front-ridge',points:[junction,[.659,.365],[.667,.276],[.671,.18],[.664,.091],[.66,.0]] },
  { id:'trunk-east',kind:'trunk',width:.0011,parent:'root-east-front',points:[[.681,.515],[.687,.407],[.689,.317],[.689,.235],[.679,.12],[.669,.0]] },
  { id:'branch-west-arch',kind:'branch',width:.0013,parent:'trunk-west',points:[[.633,.405],[.594,.347],[.546,.278],[.492,.225],[.453,.179],[.435,.096],[.438,.0]] },
  { id:'branch-west-wide',kind:'branch',width:.0011,parent:'branch-west-arch',points:[[.546,.278],[.49,.24],[.423,.24],[.355,.272],[.277,.312],[.19,.35],[.098,.39],[.008,.415]] },
  { id:'branch-west-under',kind:'branch',width:.0009,parent:'trunk-west',points:[[.617,.399],[.565,.357],[.517,.345],[.466,.361],[.412,.397],[.354,.444],[.304,.468]] },
  { id:'branch-east-high',kind:'branch',width:.001,parent:'trunk-east',points:[[.683,.26],[.72,.216],[.77,.19],[.823,.144],[.874,.075],[.925,.005]] },
  { id:'branch-east-wide',kind:'branch',width:.001,parent:'trunk-east',points:[[.687,.318],[.742,.276],[.799,.249],[.857,.221],[.924,.198],[.996,.177]] },
  { id:'branch-east-low',kind:'branch',width:.0007,parent:'branch-east-wide',points:[[.789,.253],[.824,.294],[.865,.309],[.916,.32],[.975,.342]] },
  { id:'twig-left-upper',kind:'twig',width:.0005,parent:'branch-west-wide',points:[[.355,.25],[.308,.199],[.264,.148],[.217,.11],[.176,.075]] },
]
