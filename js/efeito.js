    $(window).scroll(function() {
        var bodyscroll = ( window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
        var scrollleft = (-1200 * bodyscroll);
        var scrollright = (1000 * bodyscroll);

        $(".grid-cases").css({
          "transform" : "translateX(" + scrollleft + "px)",
          "transition-duration" : "1.5s",
          "transition-timing-function": "ease-out"
        });

        $(".text-slide-right-1").css({
          "transform" : "translateX(" + scrollleft + "px)",
          "transition-duration" : "1s",
          "transition-timing-function": "ease-out"
        });

        $(".text-slide-left").css({
          "transform" : "translateX(" + scrollright + "px)",
          "transition-duration" : "1s",
          "transition-timing-function": "ease-out"
        });

        $(".text-slide-right-2").css({
          "transform" : "translateX(" + scrollleft + "px)",
          "transition-duration" : "2s",
          "transition-timing-function": "ease-out"
        });

      });

      $(document).ready(function(){
        var cursor = $(".cursor");

          $(window).mousemove(function(e) {
              cursor.css({
                  top: e.clientY - cursor.height() / 2,
                  left: e.clientX - cursor.width() / 2
              });
          });

          $(window)
              .mouseleave(function() {
                  cursor.css({
                      opacity: "0"
                  });
              })
              .mouseenter(function() {
                  cursor.css({
                      opacity: "1"
                  });
              });

              $(".efeito-1")
                  .mouseenter(function() {
                      cursor.css({
                          "mix-blend-mode": "normal",
                          "transform" : "scale(3.2)"
                      });
                  })
                  .mouseleave(function() {
                      cursor.css({
                          "mix-blend-mode" : "normal",
                          "transform": "scale(1)"
                      });
                  });

                  $(".efeito-2")
                      .mouseenter(function() {
                          cursor.css({
                              transform: "scale(.0)"
                          });
                      })
                      .mouseleave(function() {
                          cursor.css({
                              transform: "scale(1)"
                          });
                      });

                      $(".efeito-3")
                          .mouseenter(function() {
                              cursor.css({
                                  "background-color": "#f4efe6",
                                  "transform" : "scale(8.2)"
                              });
                          })
                          .mouseleave(function() {
                              cursor.css({
                                  "background-color": "#ffcc00",

                                  "transform": "scale(1)"
                              });
                          });

                            $(".efeito-4")
                                .mouseenter(function() {
                                    cursor.addClass("text-cursor");
                                })
                                .mouseleave(function() {
                                    cursor.removeClass("text-cursor");
                                });

                                $(".efeito-5")
                                    .mouseenter(function() {
                                        cursor.addClass("dropdown-cursor");
                                    })
                                    .mouseleave(function() {
                                        cursor.removeClass("dropdown-cursor");
                                    });

                                    $(".efeito-menu-mobile")
                                        .mouseenter(function() {
                                            cursor.addClass("menu-mobile-cursor");
                                        })
                                        .mouseleave(function() {
                                            cursor.removeClass("menu-mobile-cursor");
                                        });

                                    $(".select-items > div")
                                        .mouseenter(function() {
                                            cursor.removeClass("dropdown-cursor");
                                        })
                                        .mouseleave(function() {
                                            cursor.addClass("dropdown-cursor");
                                        });

                                          $(window)
                                              .mousedown(function() {
                                                  cursor.css({
                                                      transform: "scale(.2)"
                                                  });
                                              })
                                              .mouseup(function() {
                                                  cursor.css({
                                                      transform: "scale(1)"
                                                  });
                                              });
                                      });

                                      $(document).ready(function(){

                                        $(".menu-sanduba").click(function(){
                                          $(".cursor").toggleClass("menu-mobile-cursor");
                                          $("body").toggleClass("menu-mobile-ativo");
                                          $("header").toggleClass("efeito-menu-mobile");
                                        });

                                        $("#menu-mobile .link-text").click(function(){
                                          $("body").removeClass("menu-mobile-ativo");
                                          $("header").removeClass("efeito-menu-mobile");
                                          $(".cursor").removeClass("menu-mobile-cursor");
                                        });

                                      });