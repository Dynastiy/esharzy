<template>
  <div>
    <div>
      <footer class="footer mt-4">
        <div class="container-fluid py-3">
          <div class="footer--top">
            <div class="row">
              <div class="col-md-4 mb-3">
                <p>Got Question? Email us </p>
                <h4 class="footer--header"><a href="mail-to:e_sharzy@yahoo.com" class="text-white" style="font-size:20px">e_sharzy@yahoo.com</a></h4>
                <div class="mt-4">
                  <h6 class="">Social Media</h6>
                  <div class="d-flex mt-2" style="gap:10px">
                    <a target="_blank" href="https://www.youtube.com/channel/UCTxumQup38Yhz9M-6iJa83g">
                      <i class="fa fa-youtube-play text-danger" style="font-size:18px" aria-hidden="true"></i>
                    </a>
                    <a target="_blank" href="https://twitter.com/ESharzy?s=09"> <i class="fa fa-twitter text-info" style="font-size:18px" aria-hidden="true"></i> </a>
                    <a target="_blank" href="https://www.facebook.com/E-Sharzy-online-mall-106828584951127/">
                      <i class="fa fa-facebook text-primary" style="font-size:18px" aria-hidden="true"></i>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/e_sharzy/">
                      <i class="fa fa-instagram text-danger" style="font-size:18px"  aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md">
                <h4 class="footer--header">COMPANY</h4>
                <ul class="list-unstlyed">
                  <li><router-link to="/privacy-policy"> About Us</router-link></li>
                  <li><router-link to="/">Careers</router-link></li>
                </ul>
               
              </div>

              <div class="col-md">
                <h4 class="footer--header">MY ACCOUNT</h4>
                <ul class="list-unstlyed">
                  <!-- <li> <a target="_blank" href="https://zugacoin.io">Blockmay.com</a> </li> -->
                  <li><router-link to="/cart">View Cart</router-link></li>
                  <li><router-link to="/login">Sign In</router-link></li>
                  <li><router-link to="/wishlist">My Wishlist</router-link></li>
                  <li><router-link to="/refund-policy"> Refund Policy</router-link></li>
                </ul>
              </div>

              <div class="col-md">
                <h4>CUSTOMER SERVICE</h4>
                <!-- <h6 class="text-white">Follow Us</h6> -->
                <ul class="list-unstlyed">
                  <li><router-link to="/privacy-policy"> Privacy Policy</router-link></li>
                  <li><router-link to="/terms-and-conditions">Terms and Conditions</router-link></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer--copyright">
            <hr class="w-50 mx-auto bg-secondary" />
            <p class="text-center small">
              Copyright 2022 © eShazy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>