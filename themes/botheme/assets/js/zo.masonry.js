/**
 * Created by John Nguyen on 03-08-2015.
 * @version 1.0
 * @author VnZacky
 */
jQuery(document).ready(function ($) {
    "use strict";
    var zo_mas_page = null;
     
	$('.zo-masonry-wrapper').each(function(){
		var $this = $(this);
		var $id = $(this).attr('id');
		$this.find('a.page-numbers').live('click',function(){
			$this.fadeTo('slow',0.3);
			var $link = $(this).attr('href');
            zo_mas_page = $(this);
			jQuery.get($link,function(data){ 
				$this.html($(data).find('#'+$id).html());
				$this.fadeTo('slow',1);
                 
                $('.zo-masonry').each(function(){
                    var $grid = $(this),
                        $parent = $(this).parent().attr('id');
            
                    var options = zoMasonry[$parent];
                    
                    $grid.find('.zo-masonry-item').resizable({
                        grid:[
                            options.columnWidth + options.grid_margin,
                            options.columnWidth * options.grid_ratio + options.grid_margin
                        ],
                        autoHide: true,
                        start:function(){
                            $grid.data('resize', false);
                        },
                        resize:function(){
                            $grid.shuffle('update');
                        },
                        stop: function( event, ui ){
                            $grid.data('resize', true);
            				$('body').addClass('zoMasonry-loading');
                            var w = Math.floor(ui.size.width/options.columnWidth),
                                h = Math.floor(ui.size.height/options.columnWidth / options.grid_ratio),
                                item = $(ui.element).data('index'),
                                pid = $(ui.element).data('id');
                            /* add like. */
                           
                            $.post(ajaxurl, {
                                action : 'zo_masonry_save',
                                pid : pid,
                                id : $parent,
                                item : item,
                                width: w,
                                height: h,
                                dataType: "json"
                            }, function(response) {
            					$('body').removeClass('zoMasonry-loading');
                            });
                        }
                    });
                });
			});
			jQuery('audio,video').mediaelementplayer();
			return false;
		});
	});
    $('.zo-masonry').each(function(){
        var $grid = $(this),
            $parent = $grid.parent().attr('id'),
            $filter = $grid.parent().find('.zo-masonry-filter'),
            options = zoMasonry[$parent];
        $grid.find('.zo-masonry-item').append('<div class="shuffle__sizer"></div>');
        options.columnWidth = zo_masonry_col_width($grid, options);  
		$grid.data({resize: true});
        
        $grid.imagesLoaded(function(){
            $grid.shuffle({
                itemSelector:'.zo-masonry-item',
                sizer: $grid.find('.shuffle__sizer'),
                buffer: 1,
            });
        });
        
		var resizeHandle = null, window_w = $(window).width();
        $(window).resize(function(){
			if($(window).width() == window_w) return;
			window_w = $(window).width();
			clearTimeout(resizeHandle);
			resizeHandle = setTimeout(function(){
				if($grid.data('resize')){
                	zo_masonry_col_width($grid, options);
                	$grid.shuffle('update');

            	}
			},500);
        });
        if($filter){
            $filter.find('a').click(function(e){
                e.preventDefault();
                // set active class
                $filter.find('a').removeClass('active');
                $(this).addClass('active');

                // get group name from clicked item
                var groupName = $(this).attr('data-group');
                // reshuffle grid
                $(this).parent().parent().parent().parent().find('.zo-masonry').shuffle('shuffle', groupName );
            });
        }
        
    });
  
    jQuery(document).ajaxComplete(function(){ 

        //if (zo_mas_page) {  
        $('.zo-masonry').each(function(){
            var $grid = $(this),
                $parent = $grid.parent().attr('id'),
                $filter = $grid.parent().find('.zo-masonry-filter'),
                options = zoMasonry[$parent];
            $grid.find('.zo-masonry-item').append('<div class="shuffle__sizer"></div>');
            options.columnWidth = zo_masonry_col_width($grid, options);
    		$grid.data({resize: true});
            $grid.imagesLoaded(function(){
                $grid.shuffle({
                    itemSelector:'.zo-masonry-item',
                    sizer: $grid.find('.shuffle__sizer'),
                    buffer: 1,
                });
            });
    		var resizeHandle = null, window_w = $(window).width();
            $(window).resize(function(){
    			if($(window).width() == window_w) return;
    			window_w = $(window).width();
    			clearTimeout(resizeHandle);
    			resizeHandle = setTimeout(function(){
    				if($grid.data('resize')){
                    	zo_masonry_col_width($grid, options);
                    	$grid.shuffle('update');
                	}
    			},500);
            });
            if($filter){
                $filter.find('a').click(function(e){
                    e.preventDefault();
                    // set active class
                    $filter.find('a').removeClass('active');
                    $(this).addClass('active');
    
                    // get group name from clicked item
                    var groupName = $(this).attr('data-group');
                    // reshuffle grid
                    $(this).parent().parent().parent().parent().find('.zo-masonry').shuffle('shuffle', groupName );
                });
            }
            
        });
         
    });
    
    function zo_masonry_col_width($container, options){
        //var w = $container.width(),
        var ww = $(window).width(),
            w = $container.width(),
            columnNum = 1,
            columnWidth = 0,
            columnHeight = 0;
		if(ww < 768){
            columnNum = options.grid_cols_xs;
        } else if(ww >= 768 && ww < 992){
            columnNum = options.grid_cols_sm;
        } else if(ww >= 992 && ww < 1200){
            columnNum = options.grid_cols_md;
        } else if(ww >= 1200){
            columnNum = options.grid_cols_lg;
        }
          
        columnWidth = Math.ceil((w-options.grid_margin*(columnNum-1))/columnNum);
        columnHeight = Math.ceil(columnWidth*options.grid_ratio);
        $container.find('.shuffle__sizer').css({
            width: columnWidth,
            margin: options.grid_margin
        });
        
        $container.find('.zo-masonry-item').each(function() {
            var $item = $(this),
                multiplier_w = $item.attr('class').match(/item-w(\d)/),
                multiplier_h = $item.attr('class').match(/item-h(\d)/),
                width = columnNum==1?columnWidth:multiplier_w[1]*columnWidth + (multiplier_w[1]-1)*options.grid_margin,
                height = columnNum==1?columnHeight:multiplier_h[1]*columnHeight +(multiplier_h[1]-1)*options.grid_margin;
            
            $item.css({
                width: width,
                height: height,
                marginBottom: options.grid_margin
            });
        });
        return columnWidth;
    }
    
});