// জেলা: উপজেলা/থানা  (প্রতি লাইনে একটি জেলা)
const RAW = `
Dhaka: Dhanmondi, Gulshan, Banani, Mirpur, Pallabi, Uttara, Mohammadpur, Motijheel, Tejgaon, Khilgaon, Khilkhet, Badda, Rampura, Jatrabari, Demra, Lalbagh, Kotwali, Sutrapur, Wari, Ramna, Shahbag, Kafrul, Sabujbagh, Hazaribagh, New Market, Cantonment, Bangshal, Chawkbazar, Gendaria, Shyampur, Mugda, Dakshinkhan, Uttarkhan, Turag, Vatara, Adabor, Sher-e-Bangla Nagar, Kadamtali, Paltan, Kamrangirchar, Dhamrai, Dohar, Keraniganj, Nawabganj, Savar
Gazipur: Gazipur Sadar, Tongi, Kaliakair, Kaliganj, Kapasia, Sreepur
Narayanganj: Narayanganj Sadar, Araihazar, Bandar, Rupganj, Sonargaon
Narsingdi: Narsingdi Sadar, Belabo, Monohardi, Palash, Raipura, Shibpur
Munshiganj: Munshiganj Sadar, Gazaria, Lohajang, Sirajdikhan, Sreenagar, Tongibari
Manikganj: Manikganj Sadar, Daulatpur, Ghior, Harirampur, Saturia, Shivalaya, Singair
Tangail: Tangail Sadar, Basail, Bhuapur, Delduar, Dhanbari, Ghatail, Gopalpur, Kalihati, Madhupur, Mirzapur, Nagarpur, Sakhipur
Kishoreganj: Kishoreganj Sadar, Austagram, Bajitpur, Bhairab, Hossainpur, Itna, Karimganj, Katiadi, Kuliarchar, Mithamain, Nikli, Pakundia, Tarail
Faridpur: Faridpur Sadar, Alfadanga, Bhanga, Boalmari, Charbhadrasan, Madhukhali, Nagarkanda, Sadarpur, Saltha
Gopalganj: Gopalganj Sadar, Kashiani, Kotalipara, Muksudpur, Tungipara
Madaripur: Madaripur Sadar, Kalkini, Rajoir, Shibchar
Rajbari: Rajbari Sadar, Baliakandi, Goalanda, Kalukhali, Pangsha
Shariatpur: Shariatpur Sadar, Bhedarganj, Damudya, Gosairhat, Naria, Zajira
Chattogram: Kotwali, Panchlaish, Double Mooring, Pahartali, Bandar, Khulshi, Halishahar, Chandgaon, Bakalia, Bayazid, Patenga, Akbar Shah, Anwara, Banshkhali, Boalkhali, Chandanaish, Fatikchhari, Hathazari, Lohagara, Mirsharai, Patiya, Rangunia, Raozan, Sandwip, Satkania, Sitakunda
Cox's Bazar: Cox's Bazar Sadar, Chakaria, Eidgaon, Kutubdia, Maheshkhali, Pekua, Ramu, Teknaf, Ukhia
Cumilla: Cumilla Sadar, Cumilla Sadar Dakshin, Adarsha Sadar, Barura, Brahmanpara, Burichang, Chandina, Chauddagram, Daudkandi, Debidwar, Homna, Laksam, Lalmai, Meghna, Monohorgonj, Muradnagar, Nangalkot, Titas
Brahmanbaria: Brahmanbaria Sadar, Akhaura, Ashuganj, Bancharampur, Bijoynagar, Kasba, Nabinagar, Nasirnagar, Sarail
Chandpur: Chandpur Sadar, Faridganj, Haimchar, Haziganj, Kachua, Matlab Dakshin, Matlab Uttar, Shahrasti
Feni: Feni Sadar, Chhagalnaiya, Daganbhuiyan, Fulgazi, Parshuram, Sonagazi
Lakshmipur: Lakshmipur Sadar, Kamalnagar, Raipur, Ramganj, Ramgati
Noakhali: Noakhali Sadar, Begumganj, Chatkhil, Companiganj, Hatiya, Kabirhat, Senbagh, Sonaimuri, Subarnachar
Khagrachhari: Khagrachhari Sadar, Dighinala, Guimara, Lakshmichhari, Mahalchhari, Manikchhari, Matiranga, Panchhari, Ramgarh
Rangamati: Rangamati Sadar, Baghaichhari, Barkal, Belaichhari, Juraichhari, Kaptai, Kawkhali, Langadu, Naniarchar, Rajasthali
Bandarban: Bandarban Sadar, Alikadam, Lama, Naikhongchhari, Rowangchhari, Ruma, Thanchi
Rajshahi: Boalia, Rajpara, Motihar, Shah Makhdum, Bagha, Bagmara, Charghat, Durgapur, Godagari, Mohanpur, Paba, Puthia, Tanore
Bogura: Bogura Sadar, Adamdighi, Dhunat, Dhupchanchia, Gabtali, Kahaloo, Nandigram, Shajahanpur, Sherpur, Shibganj, Sonatala
Joypurhat: Joypurhat Sadar, Akkelpur, Kalai, Khetlal, Panchbibi
Naogaon: Naogaon Sadar, Atrai, Badalgachhi, Dhamoirhat, Manda, Mohadevpur, Niamatpur, Patnitala, Porsha, Raninagar, Sapahar
Natore: Natore Sadar, Bagatipara, Baraigram, Gurudaspur, Lalpur, Naldanga, Singra
Chapainawabganj: Chapainawabganj Sadar, Bholahat, Gomastapur, Nachole, Shibganj
Pabna: Pabna Sadar, Atgharia, Bera, Bhangura, Chatmohar, Faridpur, Ishwardi, Santhia, Sujanagar
Sirajganj: Sirajganj Sadar, Belkuchi, Chauhali, Kamarkhanda, Kazipur, Raiganj, Shahjadpur, Tarash, Ullahpara
Khulna: Khulna Sadar, Sonadanga, Khalishpur, Daulatpur, Khan Jahan Ali, Batiaghata, Dacope, Dighalia, Dumuria, Koyra, Paikgachha, Phultala, Rupsha, Terokhada
Bagerhat: Bagerhat Sadar, Chitalmari, Fakirhat, Kachua, Mollahat, Mongla, Morrelganj, Rampal, Sarankhola
Chuadanga: Chuadanga Sadar, Alamdanga, Damurhuda, Jibannagar
Jashore: Jashore Sadar, Abhaynagar, Bagherpara, Chaugachha, Jhikargachha, Keshabpur, Manirampur, Sharsha
Jhenaidah: Jhenaidah Sadar, Harinakunda, Kaliganj, Kotchandpur, Maheshpur, Shailkupa
Kushtia: Kushtia Sadar, Bheramara, Daulatpur, Khoksa, Kumarkhali, Mirpur
Magura: Magura Sadar, Mohammadpur, Shalikha, Sreepur
Meherpur: Meherpur Sadar, Gangni, Mujibnagar
Narail: Narail Sadar, Kalia, Lohagara
Satkhira: Satkhira Sadar, Assasuni, Debhata, Kalaroa, Kaliganj, Shyamnagar, Tala
Barishal: Barishal Sadar, Agailjhara, Babuganj, Bakerganj, Banaripara, Gaurnadi, Hizla, Mehendiganj, Muladi, Wazirpur
Barguna: Barguna Sadar, Amtali, Bamna, Betagi, Patharghata, Taltali
Bhola: Bhola Sadar, Burhanuddin, Char Fasson, Daulatkhan, Lalmohan, Manpura, Tazumuddin
Jhalokathi: Jhalokathi Sadar, Kathalia, Nalchity, Rajapur
Patuakhali: Patuakhali Sadar, Bauphal, Dashmina, Dumki, Galachipa, Kalapara, Mirzaganj, Rangabali
Pirojpur: Pirojpur Sadar, Bhandaria, Kawkhali, Mathbaria, Nazirpur, Nesarabad, Zianagar
Sylhet: Sylhet Sadar, Balaganj, Beanibazar, Bishwanath, Companiganj, Dakshin Surma, Fenchuganj, Golapganj, Gowainghat, Jaintiapur, Kanaighat, Osmani Nagar, Zakiganj
Habiganj: Habiganj Sadar, Ajmiriganj, Bahubal, Baniachong, Chunarughat, Lakhai, Madhabpur, Nabiganj, Shayestaganj
Moulvibazar: Moulvibazar Sadar, Barlekha, Juri, Kamalganj, Kulaura, Rajnagar, Sreemangal
Sunamganj: Sunamganj Sadar, Bishwamvarpur, Chhatak, Dakshin Sunamganj, Derai, Dharamapasha, Dowarabazar, Jagannathpur, Jamalganj, Sullah, Tahirpur
Rangpur: Rangpur Sadar, Badarganj, Gangachara, Kaunia, Mithapukur, Pirgachha, Pirganj, Taraganj
Dinajpur: Dinajpur Sadar, Birampur, Birganj, Biral, Bochaganj, Chirirbandar, Phulbari, Ghoraghat, Hakimpur, Kaharole, Khansama, Nawabganj, Parbatipur
Gaibandha: Gaibandha Sadar, Fulchhari, Gobindaganj, Palashbari, Sadullapur, Saghata, Sundarganj
Kurigram: Kurigram Sadar, Bhurungamari, Char Rajibpur, Chilmari, Phulbari, Nageshwari, Rajarhat, Raomari, Ulipur
Lalmonirhat: Lalmonirhat Sadar, Aditmari, Hatibandha, Kaliganj, Patgram
Nilphamari: Nilphamari Sadar, Dimla, Domar, Jaldhaka, Kishoreganj, Saidpur
Panchagarh: Panchagarh Sadar, Atwari, Boda, Debiganj, Tentulia
Thakurgaon: Thakurgaon Sadar, Baliadangi, Haripur, Pirganj, Ranisankail
Mymensingh: Mymensingh Sadar, Bhaluka, Dhobaura, Fulbaria, Gaffargaon, Gauripur, Haluaghat, Ishwarganj, Muktagachha, Nandail, Phulpur, Tarakanda, Trishal
Jamalpur: Jamalpur Sadar, Bakshiganj, Dewanganj, Islampur, Madarganj, Melandaha, Sarishabari
Netrokona: Netrokona Sadar, Atpara, Barhatta, Durgapur, Kalmakanda, Kendua, Khaliajuri, Madan, Mohanganj, Purbadhala
Sherpur: Sherpur Sadar, Jhenaigati, Nakla, Nalitabari, Sreebardi
`;
export const AREAS = Object.fromEntries(RAW.trim().split('\n').map(l => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).split(',').map(s => s.trim())]; }));
