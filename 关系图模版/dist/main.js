		function shaixuan(){
			
			console.log(bian);
			console.log(dian);
			option3(myChart,bian,dian);
			time = $("input[ name='time' ] ").val();

			//判断time是否合法，不输入默认为7天维度
			if(time == ""){
				time = "7";
			}
			if(time != "7" && time != "30"){
				alert("请在第一行输入正确的日期");
				return;
			}
			if(time == "7"){
				jiedian_res = jiedian_7;
				bian_res = bian_7;
				console.log(jiedian_res);
			}
			if(time == "30"){
				jiedian_res = jiedian_30;
				bian_res = bian_30;
				console.log(jiedian_res);
			}

			//读入参数模块
			element = $("input[ name='element' ] ").val();
			if(element == ""){
				element = "ip";
			}
			round = $("input[ name='round' ] ").val();
			cnt = $("input[ name='cnt' ] ").val();
			name = $("input[ name='name' ] ").val();
			

		




	    	dian1 = "[{";
	    	var pan_dian = 0;
	    	for(var i = 0;i < jiedian_res.length;i++){
	    		if(jiedian_res[i].element.match(element) == null){
	    			continue;
	    		}
	    		if(pan_dian == 0){
	    			dian1 += "\"element\":\""+jiedian_res[i].element+"\",\"id\":\""+jiedian_res[i].id+"\",\"cnt\":\""+jiedian_res[i].cnt+"\",\"size\":\""+jiedian_res[i].size+"\"}";
	    			pan_dian = 1;
	    		}else{
	    			dian1 += ",{\"element\":\""+jiedian_res[i].element+"\",\"id\":\""+jiedian_res[i].id+"\",\"cnt\":\""+jiedian_res[i].cnt+"\",\"size\":\""+jiedian_res[i].size+"\"}";
	    		}
	    	}
	    	if (pan_dian == 0) {
	    		alert("无符号描述点，请检查后重新输入");
	    	}else{
	    		dian1 += "]";
	    		jiedian = $.parseJSON(dian1);
	    	}

	    	bian7 = "[{";
	    	var pan_bian = 0;
	    	for(var i = 0;i < bian_res.length;i++){
	    		if(bian_res[i].Source.match(name) == null){
    				continue;
    			}
    			if(isNaN(Number(round))){
	    			alert("输入重复率格式有误，只要数字就好，请重新输入")
	    			pan = 2
	    			break;
	    		}
	    		if(Number(bian_res[i].round) < Number(round)){
	    			continue;
	    		}
	    		if(isNaN(Number(cnt))){
	    			alert("输入重复数量有误，仅支持数字，请重新输入")
	    			pan = 2
	    			break;
	    		}
	    		if(Number(bian_res[i].cnt) < Number(cnt)){
	    			continue;
	    		}
	    		if(bian_res[i].element.match(element) == null){
	    			continue;
	    		}
	    		if(pan_bian == 0){
	    			bian7 += "\"Source\":\""+bian_res[i].Source+"\",\"Target\":\""+bian_res[i].Target+"\",\"cnt\":\""+bian_res[i].cnt+"\",\"start_time\":\""+bian_res[i].start_time+"\",\"round\":\""+bian_res[i].round+"\"}";
	    			pan_bian = 1;
	    		}else{
	    			bian7 += ",{\"Source\":\""+bian_res[i].Source+"\",\"Target\":\""+bian_res[i].Target+"\",\"cnt\":\""+bian_res[i].cnt+"\",\"start_time\":\""+bian_res[i].start_time+"\",\"round\":\""+bian_res[i].round+"\"}";
	    		}
	    	}

	    	if(pan_bian == 0){
	    		alert("无符合描述边，请检查后重新输入");
	    	}else{
	    		bian7 += "]"
	    		$("#show-text").text(bian7);
	    		bian7 =  $.parseJSON(bian7);
	    		//option2(myChart,bian7,jiedian);
	    	}
    	}

    	function option3(myChart,bian,jiedian){
    		var lay = ($("#select_lay").val());
    		var repulsion = $("input[ name='repulsion' ] ").val();
			gravity = $("input[ name='gravity' ] ").val();



    		myChart.hideLoading();
    		myChart.setOption(option = {
			    title: {
			        text: ''
			    },
			    tooltip:{
			        formatter:function(params){
			        	return "起始点："+params.data.source+",重复率："+params.data.value + ",重复数：" + params.data.value1+",测试时间："+params.data.time_s;
			        }

			    },
			    animationDurationUpdate: 1500,
			    animationEasingUpdate: 'quinticInOut',
			    series : [
			        {
			            type: 'graph',
			            layout: lay,//'circular',//'force',
			            // progressiveThreshold: 700,
			            data: jiedian.map(function (node) {
			                return {
			                    id: node.id,
			                    name: node.id,
			                    symbolSize: (node.size*2),
			                    value1:node.cnt,
			                    value:"无统计"


			                };
			            }),
			            links: bian.map(function (edge) {
			                return {
			                    source: edge.Source,
			                    target: edge.Target,
			                    value:edge.round,
			                    value1:edge.cnt,
			                    time_s:edge.start_time,
			                    label: {
					                normal: {
					                    show: false
					                }
					            }
			                };
			            }),
			           	//edgeSymbol: ['circle', 'arrow'],
			            label: {
			                emphasis: {
			                    position: 'right',
			                    show: true
			                }
			            },
			            roam: true,
			            focusNodeAdjacency: true,
			            lineStyle: {
			            	color:"#0000006b",
			                normal: {
			                    width: 0.5,
			                    curveness: 0.3,
			                    opacity: 0.7,

			                },
			            },
			            force: {
					        layoutAnimation: true,
					        repulsion:10,//节点间斥力因子，可设置成数组，不同的值会线性映射到不同的斥力
					        gravity:0.1//节点受到
			        	},
			        	circular: {
		                    rotateLabel: true
		                }
			        }
			    ]
			}, true);
    	}


//筛选，展示div动态显示隐藏模块
function click_mo(){
	$("#select-p").click(function(){
    	$("#select-none").show(500);
    	$("#select").hide(500);

   	})
    $("#select-none").click(function(){
    	$("#select-none").hide(500);
    	$("#select").show(500);
    })

    $("#show-p").click(function(){
    	$("#show-none").show(500);
    	$("#show").hide(500);
    })
    $("#show-none").click(function(){
    	$("#show-none").hide(500);
    	$("#show").show(500);
    }) 
}

//布局选择器触发斥力引力因子div显示模块
$(document).ready(function(){ 
	$('#select_lay').change(function(){ 
		var lay = ($("#select_lay").val());
		if(lay == "force"){
			$("#power").show(500);
		}else{
			$("#power").hide(500);
		}
	}) 
})