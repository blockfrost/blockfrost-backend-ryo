const query_found = [{ result: 1 }];

const query_assets_regular = [
  {
    asset: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
    quantity: '1',
  },
  {
    asset: '69b30e43bc5401bb34d0b12bd06cd9b537f33065aa49df7e8652739d4c51',
    quantity: '21000000000000',
  },
  { asset: '0f099e6adb179cf8e893d6a035f352e48f4b7513f34d2d9ac91394dc', quantity: '1000000' },
];

const response_assets_regular = [
  {
    asset: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
    quantity: '1',
  },
  {
    asset: '69b30e43bc5401bb34d0b12bd06cd9b537f33065aa49df7e8652739d4c51',
    quantity: '21000000000000',
  },
  { asset: '0f099e6adb179cf8e893d6a035f352e48f4b7513f34d2d9ac91394dc', quantity: '1000000' },
];

const query_assets_asset_regular_1 = {
  asset: '416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
  policy_id: '416958a374690d4597b50428be9c060aed5217e75807310cefdf7010',
  asset_name: '62616e616e6173',
  asset_name_UTF8: 'bananas',
  quantity: '5',
  initial_mint_tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
  onchain_metadata_extra: null,
};

const response_assets_asset_regular_1 = {
  asset: '416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
  policy_id: '416958a374690d4597b50428be9c060aed5217e75807310cefdf7010',
  asset_name: '62616e616e6173',
  fingerprint: 'asset1r09gmwpzr780ee5q2xe0j9678xmcxzf24gv5wy',
  quantity: '5',
  initial_mint_tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata_standard: null,
  onchain_metadata: null,
  onchain_metadata_extra: null,
};

const query_assets_asset_regular_2 = {
  asset: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  policy_id: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  asset_name: null,
  asset_name_UTF8: 'nutcoin',
  quantity: '100042',
  initial_mint_tx_hash: 'abfda1ba36b9ee541516fda311319f7bdb3e3928776c2982d2f027f3e8fa54c7',
  mint_or_burn_count: 1,
  onchain_metadata: null,
  metadata: null,
  onchain_metadata_extra: null,
};

const response_assets_asset_regular_2 = {
  asset: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  policy_id: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  asset_name: null,
  fingerprint: 'asset1cvmyrfrc7lpht2hcjwr9lulzyyjv27uxh3kcz0',
  quantity: '100042',
  initial_mint_tx_hash: 'abfda1ba36b9ee541516fda311319f7bdb3e3928776c2982d2f027f3e8fa54c7',
  mint_or_burn_count: 1,
  onchain_metadata: null,
  onchain_metadata_standard: null,
  metadata: {
    decimals: null,
    description: 'The legendary Nutcoin, the first native asset minted on Cardano.',
    logo: 'fakelogo',
    name: 'nutcoin',
    ticker: 'NUT',
    url: 'https://fivebinaries.com/nutcoin',
  },
  onchain_metadata_extra: null,
};
const query_assets_asset_from_CIP_example = {
  asset: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  policy_id: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  asset_name: null,
  asset_name_UTF8: 'SpaceBud3412',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
  onchain_metadata_extra: null,
};

const response_assets_asset_from_CIP_example = {
  asset: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  policy_id: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  asset_name: null,
  fingerprint: 'asset1rjklcrnsdzqp65wjgrg55sy9723kw09mlgvlc3',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
  onchain_metadata_standard: null,
  onchain_metadata_extra: null,
};

const query_assets_asset_with_onchain_metadata = {
  asset: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
  asset_name: '537061636542756433343132',
  asset_name_UTF8: 'SpaceBud3412',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: {
    d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc: {
      SpaceBud183: {
        name: 'SpaceBud #183',
        type: 'Robot',
        image: ['ipfs://QmR9bYtGLv8s42CLZVuTTbGAQmpZUSNuFtJ3VkcodUsySx', 'not_stonks'],
        traits: ['Chestplate', 'Belt', 'Sword'],
        arweaveId: 'Beh3wDNA79JcyJTRUG9rbLjlB6y2dI3dfA6J9LKnUL4',
      },
      SpaceBud1463: {
        name: 'SpaceBud #1463',
        type: 'Arcane',
        image: 'ipfs://QmNTHLjmRebxCJsxXex5cCFYd21YM7omYsThSb6QoM39NF',
        traits: [
          'Camo Suit',
          'Chestplate',
          'Belt',
          'Jetpack',
          'Covered Helmet',
          'Sword',
          'Watch',
          'Flowers',
        ],
        arweaveId: 'mgYZ4VKnCYoXolp60Z-24Y2tEcUGg-YoI8jrI4-SNPY',
      },
      SpaceBud3412: {
        name: 'SpaceBud #3412',
        type: 'Bear',
        image: ['ipfs://QmPQWCUh9abUP2NQ2svMsRgcehez1VN6QGAcBCpuVQNdKp', 'stonks'],
        traits: ['Star Suit', 'Belt', 'Sword'],
        arweaveId: 'h9DQz_MVMCAbKX5FX0OJrUEaM-OgFuZ_y-4nSOVXIgk',
      },
      SpaceBud4162: {
        name: 'SpaceBud #4162',
        type: 'Frog',
        image: 'ipfs://QmTTjqLx8jDhuuGDhJJHf1JhP36X1m8PVd9Vb59U8xwTzW',
        traits: ['Star Suit', 'Chestplate', 'Belt', 'Sword', 'Harpoon'],
        arweaveId: 'bO5aCD9_oxN-p1WZKeiOESgelYBlSBsF-_C-fEmZtXY',
      },
    },
  },
  onchain_metadata_extra: null,
  onchain_metadata_cbor:
    'a11902d1a178386435653662663035303033373864346630646134653864646536626563656337363231636438636266356362623962383730313364346363b81d6c537061636542756431303632a569617277656176654964782b5369457974796b796f6d587a6c683366634a595973534d4f5969434b6e316b334f4145327830444e52427765696d6167657835697066733a2f2f516d646279377632636a7654503166535a366251736b3178747235524e71675852534d61797a625743624b6f6f7a646e616d656e537061636542756420233130363266747261697473826e436f76657265642048656c6d65746553776f7264647479706563446f676c537061636542756431343037a569617277656176654964782b5f5a33626e6b5a566d316d49393852654b45673869684e5566327639693451306d786e51675a456f537a4d65696d6167657835697066733a2f2f516d6479554a4c4744464e6677463768726370584b6b4d3958576a4a43616771456f75676772656a416974435a5a646e616d656e53706163654275642023313430376674726169747386695374617220537569746a4368657374706c6174656442656c746e436f76657265642048656c6d65746553776f726466506973746f6c6474797065634170656c537061636542756431343631a569617277656176654964782b5a63593762675a3162544d4e783237633647504949674f457a35594b7956365259314863526c6c634d634d65696d6167657835697066733a2f2f516d575a53446d527774664a746271564b4e684e6636346550624868516b5a3739696463344676517a4455615645646e616d656e537061636542756420233134363166747261697473866a4368657374706c6174656442656c74684261636b7061636b6e436f76657265642048656c6d65746553776f72646743617264616e6f647479706563446f676c537061636542756431343633a569617277656176654964782b6d67595a34564b6e43596f586f6c7036305a2d323459327445635547672d596f49386a7249342d534e505965696d6167657835697066733a2f2f516d4e54484c6a6d52656278434a73785865783563434659643231594d376f6d59735468536236516f4d33394e46646e616d656e537061636542756420233134363366747261697473886943616d6f20537569746a4368657374706c6174656442656c74674a65747061636b6e436f76657265642048656c6d65746553776f726465576174636867466c6f77657273647479706566417263616e656b5370616365427564313833a569617277656176654964782b4265683377444e4137394a63794a545255473972624c6a6c42367932644933646641364a394c4b6e554c3465696d6167657835697066733a2f2f516d5239625974474c7638733432434c5a56755454624741516d705a55534e7546744a33566b636f645573795378646e616d656d5370616365427564202331383366747261697473836a4368657374706c6174656442656c746553776f7264647479706565526f626f746c537061636542756431383732a569617277656176654964782b6173416f3454726a5f55612d594175434338666b67483355786568625430496a4d354d796245786f484a6365696d6167657835697066733a2f2f516d594c37344550547753694c544a42675656724c4c7732597858666d6a6f5a55326a7551517658657850715655646e616d656e537061636542756420233138373266747261697473846a4368657374706c6174656442656c746256526553776f726464747970656554696765726b5370616365427564323130a569617277656176654964782b4e7445554f6d6e366e50366d37577253685062395046574c6d57367747397666484469686537577938425965696d6167657835697066733a2f2f516d5a4d6444437131636e75754a514369516870794e68716a4c4577376e36384c34693331355654756973665576646e616d656d537061636542756420233231306674726169747385695374617220537569746a4368657374706c6174656442656c746e436f76657265642048656c6d65746553776f72646474797065644c696f6e6c537061636542756432313834a569617277656176654964782b4a584a5353594943577636486956425856776e5f5149547a3843776c465933414f4e2d665065344967626365696d6167657835697066733a2f2f516d5a765a504561384c536f78534831475175635837477971794a7043727166356b3661684634416634766b6669646e616d656e53706163654275642023323138346674726169747386725370656369616c204261636b67726f756e64695374617220537569746a4368657374706c6174656442656c7464466c61676553776f72646474797065634361746c537061636542756432323530a569617277656176654964782b525a623961413468394d304245437a764a305f5a776955756763655077496742786d636333654863466d3065696d6167657835697066733a2f2f516d516b45556f4169424c4d567a34644d3659385369366d537a585a6f6157715769796b6631394869523946336a646e616d656e537061636542756420233232353066747261697473856a4368657374706c6174656442656c746e436f76657265642048656c6d65746553776f726466416d756c657464747970656446726f676c537061636542756432363031a569617277656176654964782b553156737136756a55415946432d6d506234727872694d657a78574c56344d52597a435a7164425350794d65696d6167657835697066733a2f2f516d634635334372714c61326b43324c61504e4347724261636139786e4b4253534a746753705a5673765647546b646e616d656e537061636542756420233236303166747261697473866a4368657374706c6174656442656c746e436f76657265642048656c6d657467536e6f726b656c6553776f726466506973746f6c6474797065644c696f6e6c537061636542756432363333a569617277656176654964782b6e41686362594a783469677775686d744951495f465375714475456374674c766b36336c4856637a794f6f65696d6167657835697066733a2f2f516d50725335623672696f54316e396d3878465731484e68724870785964693168356934686d7741557473505641646e616d656e537061636542756420233236333366747261697473846a4368657374706c6174656553776f726465576174636867426c6173746572647479706563446f676c537061636542756432363430a569617277656176654964782b52304b615861584b7377446d576e4763452d5f6e3261414a78684d4f476c5878775637746b58543067465565696d6167657835697066733a2f2f516d5758466435686762736e336b4a37415a335270533770554b447239724e667269317739437479386e46745853646e616d656e537061636542756420233236343066747261697473836a4368657374706c61746567536e6f726b656c6553776f72646474797065634170656c537061636542756433303533a569617277656176654964782b584f4248544f787a484d643968735667452d624f6548356f505350544c4d3666595042394e34476b486f7765696d6167657835697066733a2f2f516d55546943384a413563487a37635245576959674241525734624d71515163536d6676436b6b336a5250594875646e616d656e537061636542756420233330353366747261697473856a4368657374706c6174656442656c7467536e6f726b656c685265766f6c7665726553776f72646474797065634361746c537061636542756433313438a569617277656176654964782b795051304e553930676e64453176476d6442514c6f765377415949795877336d30396f4b746f44795a4a5165696d6167657835697066733a2f2f516d4e7737326b3153313458473552437776675a6b363266713362546f445a4637446164724a3741677135764a33646e616d656e537061636542756420233331343866747261697473846a4368657374706c6174656442656c746553776f72646643616e646c656474797065634361746c537061636542756433343132a569617277656176654964782b683944517a5f4d564d4341624b58354658304f4a725545614d2d4f6746755a5f792d346e534f565849676b65696d6167657835697066733a2f2f516d5051574355683961625550324e513273764d735267636568657a31564e36514741634243707556514e644b70646e616d656e53706163654275642023333431326674726169747383695374617220537569746442656c746553776f7264647479706564426561726b5370616365427564333533a569617277656176654964782b6d69524c3058376e536e667841615749336c72675573466f4f32677742544c37566d43744365736d6f473465696d6167657835697066733a2f2f516d5835636b734d3768483558616d6a323434664d56324163376f587231707647736a6755525074737a7a4b3561646e616d656d537061636542756420233335336674726169747385695374617220537569746a4368657374706c6174656442656c746553776f72646842616775657474656474797065634361746b5370616365427564333835a569617277656176654964782b6c6f5171454a316644666f73616a714c4d58384d4e383438496b6836532d624a6272634f49704c5757436f65696d6167657835697066733a2f2f516d54346d527547464a66505376454173446f55584750537a615a766f36547a4c4155353167335845627a524139646e616d656d537061636542756420233338356674726169747386695374617220537569746442656c746e436f76657265642048656c6d657467536e6f726b656c6553776f72646643616e646c65647479706564426561726b5370616365427564333932a569617277656176654964782b5a2d44524f446a616a5737664941765a2d6e36454144504d70345a703538746a48754b494b6c5533326b4965696d6167657835697066733a2f2f516d6253737852725634596161466e524a4d57776167713838685239746a6b7a47707375586d3171556476764448646e616d656d5370616365427564202333393266747261697473846a4368657374706c6174656442656c746553776f72646a576f6f6c20426f6f74736474797065634170656c537061636542756434313632a569617277656176654964782b624f35614344395f6f784e2d7031575a4b65694f455367656c59426c534273462d5f432d66456d5a74585965696d6167657835697066733a2f2f516d54546a714c78386a446875754744684a4a4866314a6850333658316d38505664395662353955387877547a57646e616d656e53706163654275642023343136326674726169747385695374617220537569746a4368657374706c6174656442656c746553776f726467486172706f6f6e64747970656446726f676c537061636542756434333836a569617277656176654964782b4756756f5058456348353347396d595f38515550786f4e6a4268436f6d305a52326c6c7a5a4c306e4d427765696d6167657835697066733a2f2f516d577452737645413858637268797535475576374e78316a46535546766b774377787444554748587769645831646e616d656e537061636542756420233433383666747261697473836e436f76657265642048656c6d6574694579652050617463686553776f7264647479706563446f676c537061636542756434343331a569617277656176654964782b5f6d57314f774174336543504a2d7a70566d7061594f7759445a53775a787a4f62723046786e353057307765696d6167657835697066733a2f2f516d6658426543526965324c554e707343655a363273663336384453516e6743547431557a53346a616a7450656f646e616d656e537061636542756420233434333166747261697473856a4368657374706c6174656442656c746557617463686553776f72646c486f636b657920537469636b647479706565526f626f746c537061636542756435343232a569617277656176654964782b386e44584a324c3171612d58336c664f566567437238583754574e56587979756a494b354579783337533465696d6167657835697066733a2f2f516d514a41346172654d58683374656d37316b5936353438485147744e4c4d4b746a70366b5a7a724d59764b4a78646e616d656e53706163654275642023353432326674726169747385695374617220537569746a4368657374706c61746566416d756c65746442656c746553776f72646474797065644c696f6e6c537061636542756435353632a569617277656176654964782b3969466c5f6d374358506b352d51426862455a6b784e57346b6a6f704c4364447447685f6c493936386f4d65696d6167657835697066733a2f2f516d55756e6939635031704b524d695966387a55687a354b7a4773336d45377a6a4a446a43345954775846644358646e616d656e537061636542756420233535363266747261697473846a4368657374706c6174656442656c74694579652050617463686553776f72646474797065634361746c537061636542756436323036a569617277656176654964782b686f65365765587332654f5f3237767059736a3362725f31715465765f6f4c765046363256715538326c4965696d6167657835697066733a2f2f516d567562484659776b37334339766947314473636752445638487736785663455650464c4b5762366a4d62316f646e616d656e537061636542756420233632303666747261697473856a4368657374706c6174656e436f76657265642048656c6d6574694579652050617463686553776f72646a576f6f6c20426f6f7473647479706565416c69656e6c537061636542756436333730a569617277656176654964782b496e486c48417437692d5a6262653855554b64345170366e586e4867434c54503850715842786a684e625965696d6167657835697066733a2f2f516d623547574c367443556d334b374e4d6833764e47704e6f7664507a395035546e66777a524b73753962477170646e616d656e537061636542756420233633373066747261697473836a4368657374706c6174656442656c746553776f726464747970656554696765726c537061636542756437353030a569617277656176654964782b6b63534f3446656f457a427231766d69496345746671524e765f694276316972346366446c5655306b744965696d6167657835697066733a2f2f516d6470354e584276467647384e43536b4c6245324c754c47484341673555766234655770787543724c53316841646e616d656e537061636542756420233735303066747261697473846943616d6f20537569746a4368657374706c6174656442656c746553776f7264647479706563446f676c537061636542756438343031a569617277656176654964782b625472327039394e334c7a345274516f61654e447767715a4e6d4e766464365f303372335964485a46533465696d6167657835697066733a2f2f516d5154633238377748787839674b4a4c35517041567441586f546b485a4862516e64615656693877476f697a68646e616d656e537061636542756420233834303166747261697473836a4368657374706c6174656442656c746553776f7264647479706568456c657068616e746c537061636542756438363136a569617277656176654964782b354257445f394c53476f5f54475f7770436d30317276685f6661447766535a68614d664e3932546378684965696d6167657835697066733a2f2f516d526d3864615a3654346d52575734424a6d6e4456616e79743265364c505a4d6a343676515671787844354e41646e616d656e537061636542756420233836313666747261697473836a4368657374706c6174656442656c746553776f7264647479706565526f626f746c537061636542756438373038a569617277656176654964782b3531527241426a58615f5a78317963597468356334575a4b63584a442d4852647a5f38673750547959784165696d6167657835697066733a2f2f516d4e75393335387a3545726f506a597667726d4a396a55507a6e4d5037536e4e393761726e705974594b726f43646e616d656e537061636542756420233837303866747261697473816553776f72646474797065655469676572',
};

const response_assets_asset_with_onchain_metadata = {
  asset: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
  asset_name: '537061636542756433343132',
  fingerprint: 'asset1fvqhhxjxgrlec2fanc86quyhdrrhxw0ap3x6yr',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata_standard: 'CIP25v1',
  onchain_metadata: {
    name: 'SpaceBud #3412',
    image: ['ipfs://QmPQWCUh9abUP2NQ2svMsRgcehez1VN6QGAcBCpuVQNdKp', 'stonks'],
    type: 'Bear',
    traits: ['Star Suit', 'Belt', 'Sword'],
    arweaveId: 'h9DQz_MVMCAbKX5FX0OJrUEaM-OgFuZ_y-4nSOVXIgk',
  },
  onchain_metadata_extra: null,
};

const query_assets_asset_history_regular_1 = [
  {
    tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
    amount: '1000000000',
    action: 'minted',
  },
  {
    tx_hash: '66d20f0c1f4e7b56531b899905908b50d04142f9b9f9d9524fb4ce69364bf44a',
    amount: '-5',
    action: 'burned',
  },
  {
    tx_hash: '4594f243a8b3db7b46a37619415d1edffcce1c551889be51958c8ea3baf5de52',
    amount: '-999999990',
    action: 'burned',
  },
];

const response_assets_asset_history_regular_1 = [
  {
    tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
    action: 'minted',
    amount: '1000000000',
  },
  {
    tx_hash: '66d20f0c1f4e7b56531b899905908b50d04142f9b9f9d9524fb4ce69364bf44a',
    action: 'burned',
    amount: '-5',
  },
  {
    tx_hash: '4594f243a8b3db7b46a37619415d1edffcce1c551889be51958c8ea3baf5de52',
    action: 'burned',
    amount: '-999999990',
  },
];

const query_assets_asset_txs_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
  },
];

const response_assets_asset_txs_regular_1 = [
  'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
];

const query_assets_asset_transactions_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
    tx_index: 8,
    block_height: 5406748,
    block_time: 1632556851,
  },
  {
    tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
    tx_index: 12,
    block_height: 5602653,
    block_time: 1632556851,
  },
  {
    tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
    tx_index: 3,
    block_height: 5616031,
    block_time: 1632556851,
  },
  {
    tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
    tx_index: 3,
    block_height: 5633144,
    block_time: 1632556851,
  },
  {
    tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
    tx_index: 2,
    block_height: 5640905,
    block_time: 1632556851,
  },
  {
    tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    tx_index: 27,
    block_height: 5746642,
    block_time: 1632556851,
  },
];

const response_assets_asset_transactions_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
    tx_index: 8,
    block_height: 5406748,
    block_time: 1632556851,
  },
  {
    tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
    tx_index: 12,
    block_height: 5602653,
    block_time: 1632556851,
  },
  {
    tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
    tx_index: 3,
    block_height: 5616031,
    block_time: 1632556851,
  },
  {
    tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
    tx_index: 3,
    block_height: 5633144,
    block_time: 1632556851,
  },
  {
    tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
    tx_index: 2,
    block_height: 5640905,
    block_time: 1632556851,
  },
  {
    tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    tx_index: 27,
    block_height: 5746642,
    block_time: 1632556851,
  },
];

const query_assets_asset_addresses_regular_1 = [
  {
    address:
      'addr1qxrmuatfdt49ndqmxeq46zmu3daqcg078h26vwfe4nau8gpgtal0gcphul7kruzdrx6v4w78la7z5luz0xs375zz922sege8ks',
    quantity: '1',
  },
];

const response_assets_asset_addresses_regular_1 = [
  {
    address:
      'addr1qxrmuatfdt49ndqmxeq46zmu3daqcg078h26vwfe4nau8gpgtal0gcphul7kruzdrx6v4w78la7z5luz0xs375zz922sege8ks',
    quantity: '1',
  },
];

const query_assets_policy_policy_id_regular_1 = [
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
    quantity: '1',
  },
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
    quantity: '1',
  },
];

const response_assets_policy_policy_id_regular_1 = [
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
    quantity: '1',
  },
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
    quantity: '1',
  },
];

const response_400_asset = {
  error: 'Bad Request',
  message: 'Invalid or malformed asset format.',
  status_code: 400,
};

const response_400_policy = {
  error: 'Bad Request',
  message: 'Invalid or malformed policy format.',
  status_code: 400,
};

const response_404 = {
  error: 'Not Found',
  message: 'The requested component has not been found.',
  status_code: 404,
};

const response_500 = {
  error: 'Internal Server Error',
  message: 'An unexpected response was received from the backend.',
  status_code: 500,
};

export default [
  {
    name: 'respond with success and data on /assets',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: query_assets_regular,
    },
    response: response_assets_regular,
  },
  {
    name: 'respond with success and unpaged data on /assets',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: query_assets_regular,
    },
    unpaged: true,
    response: response_assets_regular,
  },
  {
    name: 'respond with success and data on /assets',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
    endpoint: '/assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
    sqlQueryMock: {
      rows: [query_assets_asset_regular_1],
    },
    response: response_assets_asset_regular_1,
  },
  {
    name: 'respond with success and data on /assets/7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
    endpoint: '/assets/7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
    sqlQueryMock: {
      rows: [query_assets_asset_from_CIP_example],
    },
    response: response_assets_asset_from_CIP_example,
  },
  {
    name: 'respond with success and data on /assets/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
    endpoint:
      '/assets/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
    sqlQueryMock: {
      rows: [query_assets_asset_with_onchain_metadata],
    },
    response: response_assets_asset_with_onchain_metadata,
  },
  {
    name: 'respond with success and data on /assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
    sqlQueryMock: {
      rows: [query_assets_asset_regular_2],
    },
    response: response_assets_asset_regular_2,
  },
  {
    name: 'respond with success and data on /assets/:asset/history',
    endpoint:
      '/assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_history_regular_1,
    },
    response: response_assets_asset_history_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /assets/:asset/history',
    endpoint:
      '/assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_history_regular_1,
    },
    unpaged: true,
    response: response_assets_asset_history_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_txs_regular_1,
    },
    response: response_assets_asset_txs_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_txs_regular_1,
    },
    unpaged: true,
    response: response_assets_asset_txs_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/transactions',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_transactions_regular_1,
    },
    response: response_assets_asset_transactions_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /assets/:asset/transactions',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_transactions_regular_1,
    },
    unpaged: true,
    response: response_assets_asset_transactions_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/addresses',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_addresses_regular_1,
    },
    response: response_assets_asset_addresses_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /assets/:asset/addresses',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_addresses_regular_1,
    },
    unpaged: true,
    response: response_assets_asset_addresses_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/addresses',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_policy_policy_id_regular_1,
    },
    response: response_assets_policy_policy_id_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_policy_policy_id_regular_1,
    },
    unpaged: true,
    response: response_assets_policy_policy_id_regular_1,
  },
  {
    name: 'respond with success and data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },

  /*
     400s
  */

  {
    name: 'respond with 400 and empty data on /assets/:asset',
    endpoint: '/assets/asset1_stonks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/history',
    endpoint: '/assets/asset1_stonks/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/txs',
    endpoint: '/assets/asset1_stonks/txs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/transactions',
    endpoint: '/assets/asset1_stonks/transactions',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/addresses',
    endpoint: '/assets/asset1_stonks/addresses',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/policy_stonks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_policy,
  },

  /*
      404s
  */

  {
    name: 'respond with 404 and empty data on /assets/:asset',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/history',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/txs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/transactions',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/transactions',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/addresses',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/addresses',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aa',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  /*
      500s
  */

  {
    name: 'respond with 500 and empty data on /assets/list',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/history',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/history',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/txs',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/transactions',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/transactions',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/addresses',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/addresses',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/policy/:policy_id',
    endpoint: '/assets/policy/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e8789',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
];
