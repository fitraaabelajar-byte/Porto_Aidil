// script.js
const navLinks = document.querySelectorAll(".nav-link");
const pillIndicator = document.getElementById("pill-indicator");

function updatePill(element) {
  // Geser posisi dan sesuaikan ukuran pill background ke menu yang aktif
  pillIndicator.style.width = `${element.offsetWidth}px`;
  pillIndicator.style.left = `${element.offsetLeft}px`;

  // Ubah warna teks
  navLinks.forEach((link) => link.classList.remove("text-white"));
  navLinks.forEach((link) => link.classList.add("text-gray-400"));

  element.classList.remove("text-gray-400");
  element.classList.add("text-white");
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    updatePill(this);
  });
});

// script.js (Bagian window load)
window.addEventListener("DOMContentLoaded", () => {
  if (navLinks.length > 0) {
    pillIndicator.style.transition = "none";
    updatePill(navLinks[0]);

    // Munculkan pill setelah posisinya pas
    pillIndicator.classList.remove("opacity-0");

    setTimeout(() => {
      pillIndicator.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    }, 50);
  }
});

const lanyard = document.getElementById("lanyard-card");

// Pas mouse masuk, transisi dibikin super cepet biar responsif
lanyard.addEventListener("mouseenter", () => {
  lanyard.style.transition = "transform 0.05s linear";
});

lanyard.addEventListener("mousemove", (e) => {
  const rect = lanyard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Rotasi dibikin lebih soft (max 10 derajat aja)
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  lanyard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});

// Pas mouse keluar, kasih transisi slow-mo biar baliknya mulus parah
lanyard.addEventListener("mouseleave", () => {
  lanyard.style.transition = "transform 0.5s ease-out";
  lanyard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
});

// Tambahan buat Mobile Menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Tutup menu otomatis pas link diklik
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");

    // Opsional: bikin efek aktif sederhana buat HP
    mobileLinks.forEach((item) => {
      item.classList.remove("bg-slate-800/50", "text-white");
    });
    link.classList.add("bg-slate-800/50", "text-white");
  });
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Tambahin efek glassmorphism, border, dan shadow pas turun
    navbar.classList.add('bg-slate-900/80', 'backdrop-blur-xl', 'border-slate-700/50', 'shadow-2xl');
    navbar.classList.remove('bg-transparent', 'border-transparent');
  } else {
    // Hapus efek pas balik ke paling atas
    navbar.classList.remove('bg-slate-900/80', 'backdrop-blur-xl', 'border-slate-700/50', 'shadow-2xl');
    navbar.classList.add('bg-transparent', 'border-transparent');
  }
});

// ==============================================
// SKILLS FILTERING FUNCTIONALITY (FULL SOURCE)
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
  // Ambil semua elemen tombol filter dan kartu skill
  const filterButtons = document.querySelectorAll('.skill-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Fungsi Utama Filtering
  const filterSkills = (filterValue) => {
    skillCards.forEach(card => {
      // Ambil kategori dari attribute HTML kartu
      const cardCategory = card.getAttribute('data-category');

      // === ANIMASI KELUAR (FADE OUT & SHRINK) ===
      card.classList.remove('opacity-100', 'scale-100');
      card.classList.add('opacity-0', 'scale-95');

      // Tunda sedikit sebelum nyembunyiin element (biar animasi transition jalan)
      setTimeout(() => {
        // Logika Tampilkan/Sembunyikan
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Tampilkan Kartu (Ganti display jadi 'flex' buat layout grid)
          card.style.display = 'flex'; 
          
          // Tunda sebentar buat nge-trigger ulang animasi masuk
          requestAnimationFrame(() => {
            // === ANIMASI MASUK (FADE IN & GROW) ===
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
          });

        } else {
          // Sembunyikan Kartu (display 'none')
          card.style.display = 'none';
        }
      }, 300); // Durasi delay harus SAMA persis dengan transition CSS (300ms)
    });
  };

  // Tambahin Event Listener ke Tiap Tombol Filter
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Update Visual Tombol Aktif (Ganti styling)
      filterButtons.forEach(btn => {
        // Tombol Tidak Aktif: Balikin ke styling default
        btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500', "shadow-[0_0_15px_theme('colors.indigo.500/50')]");
        btn.classList.add('bg-slate-900/60', 'text-gray-400', 'border-slate-800', 'hover:text-white', 'hover:border-indigo-500/50', "hover:shadow-[0_0_15px_theme('colors.indigo.500/50')]");
      });

      // Tombol yang Diklik: Kasih warna ungu, border, DAN glow
      button.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500', "shadow-[0_0_15px_theme('colors.indigo.500/50')]");
      button.classList.remove('bg-slate-900/60', 'text-gray-400', 'border-slate-800', 'hover:text-white', 'hover:border-indigo-500/50', "hover:shadow-[0_0_15px_theme('colors.indigo.500/50')]");

      // 2. Panggil Fungsi Filter Berdasarkan Nilai Atribut Data-Filter
      const filterValue = button.getAttribute('data-filter');
      filterSkills(filterValue);
    });
  });

  // Opsional: Set default filter ke 'all' pas loading page
  // (Komen ini kalau mau defaultnya nampilin semua)
  // const allButton = document.querySelector('[data-filter="all"]');
  // if(allButton) allButton.click();
});

