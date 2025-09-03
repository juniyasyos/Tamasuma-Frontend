<template>
    <v-container fluid class="pa-0 ma-0 mt-5">
        <v-row class="py-0 my-0">
            <v-col md="12" sm="12" cols="12" class="py-0 my-0">
                <h1 class="google-font mb-2">Kebijakan Anti‑Perundungan Tamasuma</h1>
            </v-col>
        </v-row>
        <v-row class="py-0 my-0">
            <v-col md="12" sm="12" cols="12" class="py-0 my-0">
                <p class="google-font" style="font-size:100%">
                    <b style="font-size:120%;">Mengapa kami memiliki kebijakan Anti‑Perundungan resmi untuk program dan komunitas {{data}}?</b>

                    <ul class="mt-2" style="font-size:100%">
                        <li class="google-font">Menetapkan ekspektasi perilaku dalam kegiatan/kelas. Adanya kebijakan ini dapat mencegah terjadinya perundungan.</li>
                        <li class="google-font">Mendorong partisipasi dari mereka yang pernah memiliki pengalaman kurang baik di komunitas lain.</li>
                        <li class="google-font">Memberi panduan kepada penyelenggara/relawan untuk menangani perundungan secara cepat dengan gangguan minimal terhadap kegiatan.</li>
                    </ul>
                </p>

                <p class="google-font" style="font-size:100%">
                    <b style="font-size:100%;">{{data}} berkomitmen menyediakan pengalaman belajar yang bebas dari perundungan bagi semua orang, tanpa memandang:</b>

                    <ul class="mt-2" style="font-size:100%">
                        <li class="google-font">Gender</li>
                        <li class="google-font">Sexual Orientation</li>
                        <li class="google-font">Disability</li>
                        <li class="google-font">Gender Identity</li>
                        <li class="google-font">Age</li>
                        <li class="google-font">Race</li>
                        <li class="google-font">Religion</li>
                        <li class="google-font">Nationality</li>
                    </ul>

                    <span class="google-font" style="font-size:100%">Daftar di atas tidak lengkap — kami tidak mentolerir perundungan terhadap peserta dalam bentuk apa pun.</span>
                </p>

                <p class="google-font" style="font-size:100%">Bahasa dan gambar bernuansa seksual tidak pantas dalam konteks apa pun, termasuk sesi/kelas. Peserta yang melanggar kebijakan ini dapat diminta meninggalkan program dan dilarang mengikuti kegiatan {{data}} berikutnya sesuai kebijakan penyelenggara.</p>

                <p class="google-font" style="font-size:100%">Harassment includes (but is not limited to):
                    <ul class="mt-2" style="font-size:100%">
                        <li class="google-font">Offensive verbal comments related to gender, sexual orientation, disability, gender identity, age, race, religion</li>
                        <li class="google-font">The use or display of sexual images in public spaces</li>
                        <li class="google-font">Deliberate intimidation</li>
                        <li class="google-font">Stalking</li>
                        <li class="google-font">Harassing photography or recording</li>
                        <li class="google-font">Sustained disruption of talks or other events</li>
                        <li class="google-font">Inappropriate physical contact</li>
                        <li class="google-font">Unwelcome sexual attention</li>
                    </ul>
                </p>

                <p class="google-font" style="font-size:100%">Peserta yang diminta menghentikan perilaku melecehkan/perundungan diharapkan segera mematuhi.
                    <br><br>
                    Mitra dan tamu juga tunduk pada kebijakan anti‑perundungan ini. Secara khusus, pengisi acara dan pembicara tidak boleh menggunakan gambar, aktivitas, atau materi bernuansa seksual, maupun menciptakan suasana yang tersieralisasi dalam materi presentasi, materi pameran, barang promosi, atau demo.
                    <br><br>
                    Jika Anda mengalami atau menyaksikan perundungan, atau memiliki kekhawatiran lainnya, segera hubungi penyelenggara atau relawan {{data}}. Penyelenggara/relawan dapat diidentifikasi melalui kaos, lencana, atau tanda khusus. Tim penyelenggara akan menyelidiki dan mengambil tindakan yang diperlukan, termasuk membantu menghubungi keamanan lokasi atau pihak berwajib, menyediakan pendamping, atau bantuan lain agar peserta merasa aman selama kegiatan.
                    <br><br>
                    Kami berharap kebijakan ini tidak pernah perlu diterapkan, tetapi keberadaannya membantu setiap orang mempertimbangkan bagaimana tindakan dan kata‑katanya berdampak pada komunitas.
                </p>
            </v-col>
            <v-col md="4" sm="4" cols="12" class="py-0 my-0 hidden-sm-and-down">
               
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
export default {
    props:['data'],
    data:()=>({

    })
}
</script>
