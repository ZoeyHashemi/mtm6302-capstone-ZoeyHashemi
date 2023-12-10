
document.addEventListener('DOMContentLoaded', function () {
    const createNav = () => {
        let nav = document.querySelector('#navbar-placeholder');
        nav.innerHTML = `

            <nav class="navbar navbar-expand-lg " >
                     <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">APOD</a>
                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                         <ul class="navbar-nav mx-auto"> <!-- Center-align the links -->
                             <li class="nav-item">
                                 <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                             </li>
                           
                             <li class="nav-item">
                                 <a class="nav-link active" href="#" tabindex="-1" aria-disabled="true">Gallery</a>
                             </li>
                             <li class="nav-item">
                                 <a class="nav-link active" href="favorites.html" tabindex="-1" aria-disabled="true">Favorite</a>
                             </li>
                             <li class="nav-item">
                                 <a class="nav-link active" href="#" tabindex="-1" aria-disabled="true">Login</a>
                             </li>
                        </ul>
                        <button class="btn btn-primary" type="submit">Join</button>

                    </div>
                </div>
                     </nav>
            </nav>
        `;
    }

    createNav();

    const handleScroll = () => {
        let navbar = document.querySelector('.navbar');
        if (window.scrollY > 0) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
});

