var FB_PIXEL = function(){
	var order_info = [];
	var ViewContent = function(id,name,value,currency){	/* 컨텐츠 조회 */
		if(typeof fbq != 'undefined'){
			fbq('track', 'ViewContent', {
				content_type : 'product',
				content_ids : id,
				content_name : name,
				contents : [{"id": id, "quantity": 1, "item_price": value}],
				value : parseInt(value).toFixed(2),
				currency : currency
			});
		}
	};
	var AddOrderInfo = function(idx,ea,price){
		order_info.push({
			'id' : idx,
			'quantity' : ea,
			'item_price' : price,
			'type' : 'product'
		});
	};

	var AddToCart = function(id, name, price,currency,count,total_price,event_id,fb_external_id){	/* 장바구니 추가 */
		if (typeof fbq != 'undefined') fbq('track', 'AddToCart',{
			content_ids : id,
			content_type : 'product',
			content_name : name,
			contents : [{"id": id, "quantity": count, "item_price": price}],
			value : parseInt(price).toFixed(2),
			currency : currency
		},{eventID : event_id});
	};
	var AddToWishlist = function(){	/* 위시리스트 추가 */
		//console.log("FB_PIXEL - AddToWishlist");
		if (typeof fbq != 'undefined') fbq('track', 'AddToWishlist');
	};
	var InitiateCheckout = function(event_id,total_price,currency,fb_external_id){	/* 결제시작 */
		if (typeof fbq != 'undefined') {
			//console.log("FB_PIXEL - InitiateCheckout");
			if (typeof fbq != 'undefined') fbq('track', 'InitiateCheckout', {
				value: parseInt(total_price).toFixed(2),
				currency: currency
			}, {eventID: event_id});
		}
	};
	var AddPaymentInfo = function(){	/* 결제 정보 추가 */
		//console.log("FB_PIXEL - AddPaymentInfo");
		if (typeof fbq != 'undefined') fbq('track', 'AddPaymentInfo');
	};
	var Purchase = function(value,currency,flag_code,fb_external_id){
		/* 결제 완료 */
		var dispatchPurchase = function() {
			var content_ids = [];
			/* content_ids 설정 - order_info 에서 id만 뽑아서 생성해준다. */
			order_info.forEach(function(obj) {
				if (content_ids.indexOf(obj.id) == -1) content_ids.push(obj.id);
			});

			console.log("dispatchPurchaseFree : ", value, ", ", currency);
			// value가 숫자이고 currency가 존재할 때만 track
			if (!isNaN(parseFloat(value)) && currency) {
				console.log("dispatchPurchaseTrack : ", value, ", ", currency);
				// Purchase 이벤트 전송
				fbq('track', 'Purchase', {
					content_ids: content_ids,
					content_type: 'product',
					contents: order_info,
					value: parseFloat(value),
					currency: currency
				}, { eventID: flag_code });
			}
		};

		// fbq가 이미 로드되어 있으면 즉시 전송
		if (typeof fbq !== 'undefined') {
			dispatchPurchase();
			return;
		}

		// window.fbq 할당 감지를 위한 descriptor 사용
		var originalFbq = window.fbq;
		var fbqDetected = false;

		try {
			// Object.defineProperty를 사용해서 fbq 할당 감지
			Object.defineProperty(window, 'fbq', {
				get: function() {
					return originalFbq;
				},
				set: function(value) {
					originalFbq = value;
					if (!fbqDetected && typeof value === 'function') {
						fbqDetected = true;
						setTimeout(function() {
							dispatchPurchase();
						}, 0);
					}
				},
				configurable: true
			});
		} catch(e) {
			// defineProperty가 실패하는 경우 (IE8 등) 폴백
			var checkFbq = function() {
				if (typeof window.fbq !== 'undefined' && !fbqDetected) {
					fbqDetected = true;
					dispatchPurchase();
				} else if (!fbqDetected) {
					setTimeout(checkFbq, 100);
				}
			};
			setTimeout(checkFbq, 100);
		}

		// 10초 타임아웃으로 강제 정리
		setTimeout(function() {
			fbqDetected = true; // 더 이상 감지하지 않음
		}, 10000);
	};
	var CompleteRegistration = function(type,currency,id){
		if(type == 'join'){
			if (typeof fbq != 'undefined') fbq('track', 'CompleteRegistration',{'id' : id , 'value' : 0, 'currency' : currency});
		}else{
			if (typeof fbq != 'undefined') fbq('track', 'CompleteRegistration',{'value' : 0, 'currency' : currency});
		}
	};


	var use_npay_count = false;
	var setUseNpayCount = function(b){
		use_npay_count = (b === true);
	};
	var addNpayOrder = function(order_data){
		if(!use_npay_count) return false;
		if( typeof order_data == 'undefined') return false;
		if( typeof order_data['list'] == 'undefined') return false;
		// 네이버 페이도 구매전환에 포함하게끔 옵션을 사용할 경우에는 구매완료를 바로 보낸다

		var np_fb_data = {'total_price': 0, 'currency': order_data['currency']};
		var npay_order_item = {};
		for(var i = 0; i<order_data['list'].length; i++){
			npay_order_item = order_data['list'][i];
			AddOrderInfo(npay_order_item['prod_idx'], npay_order_item['count'], npay_order_item['price']);
		}
		np_fb_data['total_price'] = order_data['total_price'];
		np_fb_data['pc_event_id'] = order_data['pc_event_id'];
		np_fb_data['fb_external_id'] = order_data['fb_external_id'];

		Purchase(np_fb_data['total_price'], np_fb_data['currency'], np_fb_data['pc_event_id'],np_fb_data['fb_external_id']);
	};
	return {
		"ViewContent" : function(id,name,value,currency){
			ViewContent(id,name,value,currency);
		},
		"AddToCart" : function(id, name, price,currency,count,total_price,event_id,fb_external_id){
			AddToCart(id, name, price,currency,count,total_price,event_id,fb_external_id);
		},
		"AddOrderInfo" : function(idx,ea,price){
			AddOrderInfo(idx,ea,price);
		},
		"AddToWishlist" : function(){
			AddToWishlist();
		},
		"InitiateCheckout" : function(event_id,total_price,currency,fb_external_id){
			InitiateCheckout(event_id,total_price,currency,fb_external_id);
		},
		"AddPaymentInfo" : function(){
			AddPaymentInfo();
		},
		"Purchase" : function(value,currency,order_no,fb_external_id){
			Purchase(value,currency,order_no,fb_external_id);
		},
		"CompleteRegistration" : function(type,currency,id){
			CompleteRegistration(type,currency,id);
		},
		"setUseNpayCount": function(b){
			setUseNpayCount(b);
		},
		"addNpayOrder" : function(order_data){
			addNpayOrder(order_data);
		}
	}
}();