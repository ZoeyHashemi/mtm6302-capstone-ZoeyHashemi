document.addEventListener('DOMContentLoaded', function() {
const createFooter = () => {
    let footer = document.querySelector('#footer-placeholder');
    footer.innerHTML = `
        <footer class="main-footer">
        <footer class="main-footer">
        <div class="row">
            <div class="col-md-6">
                <a class="navbar-brand" href="#">APOD</a>
                <p class="info">It is a long established fact that a reader will be distracted
                        by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less
                </p>
                <p class="info">Support Email- help@ardesign.com, customersupport@ardesign.com</p>
                <p class="info">telephone- +1 343 100 0000, +1 343 200 0003</p>
                <div class="footer-social-container">
                    <div class="mb-3">
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i> </a>
                        <a href="#" class="social-link"><i class="fab fa-facebook"></i> </a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i> </a>
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i> </a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="list-unstyled category">
                            <li class="category-title">Quick Links</li>
                            <li><a href="index.html" class="footer-link">Home</a></li>
                            <li><a href="favorites.html" class="footer-link">favorites</a></li>
                            <li><a href="about.html" class="footer-link">About Us</a></li>
                            <li><a href="contact.html" class="footer-link">Contact</a></li>
                            <li><a href="#" class="footer-link">Help& FAQ's</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-unstyled category">
                            <li class="category-title">Services</li>
                                <li><a href="#" class="footer-link">News</a></li>
                                <li><a href="#" class="footer-link">Blog</a></li>
                                <li><a href="#" class="footer-link">Videos</a></li>
                                <li><a href="#" class="footer-link">Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="row footer-credit">
        <div class="col-md-6">
            <div class="footer-credit">
                <p class="footer-credit">&copy; 2023 APOD, images from <a href="https://www.unsplash.com" class="unsplash"> Unsplash</a></p>
            </div>
        </div>
        <div class="col-md-6">
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#" class="footer-link">Terms & Services</a></li>
                <li class="list-inline-item"><a href="#" class="footer-link">Privacy Policy</a></li>
            </ul>
        </div>
    </div>
        
    `;
}

// Call the function to create the footer
createFooter();
});