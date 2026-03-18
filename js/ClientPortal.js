          const menuBtn = document.querySelector(".menu-btn");
          const mobileMenu = document.querySelector(".mobile-menu");
          const overlay = document.querySelector(".mobile-overlay");
          const closeBtn = document.querySelector(".close-menu");

          // Open Menu
          menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
          });

          // Close Menu (button)
          closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
          });

          // Close Menu (click outside)
          overlay.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
          });