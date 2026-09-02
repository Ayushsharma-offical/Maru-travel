(function(window, document) {
	'use strict';

	// 기획전(shop_showcase) 위젯 brandscope 이벤트 트래커.
	// 쇼핑 위젯 트래커(brand_product_event_tracker.js)와 동일한 호출 메커니즘
	// (카드별 IntersectionObserver 0.8 + 500ms, 클릭 backfill)을 재사용하되,
	// 이벤트명/where/속성 세트는 기획전 전용(events.yaml: *_showcase_widget)을 따른다.
	if (typeof window.WeakSet === 'undefined' || typeof window.WeakMap === 'undefined' || typeof window.Set === 'undefined') {
		try {
			if (window.console && typeof window.console.error === 'function') {
				window.console.error('[ShowcaseProductEventTracker]', {
					reason: 'unknown_error',
					stage: 'init',
					sourceEvent: '',
					widgetCode: '',
					prodCode: '',
					error: null
				});
			}
		} catch (_error) {
		}
		return;
	}

	class ShowcaseProductEventTracker {
		static init() {
			if (ShowcaseProductEventTracker.initialized) {
				return;
			}

			ShowcaseProductEventTracker.initialized = true;
			ShowcaseProductEventTracker.ensureObserver();
			ShowcaseProductEventTracker.scan();
			ShowcaseProductEventTracker.flushQueue();
		}

		static scan(widgetCode) {
			try {
				const root = ShowcaseProductEventTracker.getScanRoot(widgetCode);
				if (!root) {
					return;
				}

				const cards = root.querySelectorAll('._shop_item[data-showcase-product-event-properties]');
				cards.forEach(function(card) {
					ShowcaseProductEventTracker.observeCard(card);
				});
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('scan_error', 'scan', '', widgetCode || '', '', error);
			}
		}

		static getScanRoot(widgetCode) {
			if (!widgetCode) {
				return document;
			}

			return document.getElementById('container_' + widgetCode);
		}

		static observeCard(card) {
			if (!card || ShowcaseProductEventTracker.observedCards.has(card)) {
				return;
			}

			// 슬라이드(owl carousel) 모드는 무한 루프용으로 카드를 복제(.owl-item.cloned)한다.
			// 복제 카드는 동일 상품의 중복 DOM이므로 노출·클릭 집계에서 제외한다(카드 1개당 1회 원칙).
			if (ShowcaseProductEventTracker.isClonedCard(card)) {
				return;
			}

			ShowcaseProductEventTracker.observedCards.add(card);
			card.addEventListener('click', function(event) {
				ShowcaseProductEventTracker.handleClick(card, event);
			}, true);

			const observer = ShowcaseProductEventTracker.ensureObserver();
			if (observer) {
				try {
					observer.observe(card);
				} catch (error) {
					ShowcaseProductEventTracker.logFailure('observer_error', 'view', ShowcaseProductEventTracker.VIEW_EVENT, '', ShowcaseProductEventTracker.getProdCode(card), error);
				}
			}
		}

		static ensureObserver() {
			if (ShowcaseProductEventTracker.observer) {
				return ShowcaseProductEventTracker.observer;
			}

			if (typeof window.IntersectionObserver === 'undefined') {
				ShowcaseProductEventTracker.logFailure('intersection_observer_unavailable', 'view', ShowcaseProductEventTracker.VIEW_EVENT, '', '', null);
				return null;
			}

			try {
				ShowcaseProductEventTracker.observer = new window.IntersectionObserver(function(entries, observer) {
					entries.forEach(function(entry) {
						ShowcaseProductEventTracker.handleIntersection(entry, observer);
					});
				}, {
					threshold: 0.8
				});
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('observer_error', 'view', ShowcaseProductEventTracker.VIEW_EVENT, '', '', error);
				ShowcaseProductEventTracker.observer = null;
			}

			return ShowcaseProductEventTracker.observer;
		}

		static handleIntersection(entry, observer) {
			const card = entry.target;
			try {
				if (ShowcaseProductEventTracker.viewedCards.has(card)) {
					observer.unobserve(card);
					return;
				}

				if (entry.isIntersecting) {
					if (ShowcaseProductEventTracker.intersectionTimers.has(card)) {
						return;
					}

					const timer = window.setTimeout(function() {
						ShowcaseProductEventTracker.intersectionTimers.delete(card);
						ShowcaseProductEventTracker.fireView(card, ShowcaseProductEventTracker.IMPRESSION_SOURCE_VIEWPORT);
						observer.unobserve(card);
					}, ShowcaseProductEventTracker.VIEW_DELAY);

					ShowcaseProductEventTracker.intersectionTimers.set(card, timer);
					return;
				}

				ShowcaseProductEventTracker.clearIntersectionTimer(card);
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('observer_error', 'view', ShowcaseProductEventTracker.VIEW_EVENT, '', ShowcaseProductEventTracker.getProdCode(card), error);
			}
		}

		static handleClick(card, event) {
			try {
				if (!ShowcaseProductEventTracker.isProductDetailLinkClick(card, event.target)) {
					return;
				}

				if (!ShowcaseProductEventTracker.viewedCards.has(card)) {
					ShowcaseProductEventTracker.fireView(card, ShowcaseProductEventTracker.IMPRESSION_SOURCE_CLICK);
				}

				ShowcaseProductEventTracker.trackCardEvent(card, ShowcaseProductEventTracker.CLICK_EVENT, 'click');
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('unknown_error', 'click', ShowcaseProductEventTracker.CLICK_EVENT, '', ShowcaseProductEventTracker.getProdCode(card), error);
			}
		}

		static isClonedCard(card) {
			if (!card || typeof card.closest !== 'function') {
				return false;
			}

			return card.closest('.owl-item.cloned') !== null;
		}

		static isProductDetailLinkClick(card, target) {
			if (!target || typeof target.closest !== 'function') {
				return false;
			}

			const productLink = target.closest('a');
			if (!productLink || !card.contains(productLink)) {
				return false;
			}

			return (productLink.getAttribute('href') || '').indexOf('idx=') !== -1;
		}

		static fireView(card, impressionSource) {
			if (ShowcaseProductEventTracker.viewedCards.has(card)) {
				return true;
			}

			const tracked = ShowcaseProductEventTracker.trackCardEvent(card, ShowcaseProductEventTracker.VIEW_EVENT, 'view', {
				extraProperties: {
					impression_source: impressionSource || ShowcaseProductEventTracker.IMPRESSION_SOURCE_VIEWPORT
				}
			});
			if (tracked) {
				ShowcaseProductEventTracker.viewedCards.add(card);
			}

			return tracked;
		}

		static trackCardEvent(card, sourceEvent, stage, options) {
			const properties = ShowcaseProductEventTracker.getEventProperties(card, stage, sourceEvent);
			if (!properties) {
				return false;
			}
			const eventProperties = ShowcaseProductEventTracker.getEventPropertiesWithBrandScopeMeta(properties, stage, options);

			if (typeof window.BrandScope === 'undefined' || typeof window.BrandScope.track !== 'function') {
				ShowcaseProductEventTracker.logFailure('brand_scope_unavailable', stage, sourceEvent, eventProperties.widget_code || '', eventProperties.prod_code || '', null);
				return false;
			}

			try {
				window.BrandScope.track(sourceEvent, eventProperties);
				return true;
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('track_error', stage, sourceEvent, eventProperties.widget_code || '', eventProperties.prod_code || '', error);
			}

			return false;
		}

		static getEventPropertiesWithBrandScopeMeta(properties, stage, options) {
			const eventOptions = options || {};
			const eventProperties = Object.assign({}, properties, {
				action: stage,
				content: eventOptions.content || 'product',
				where: 'showcase_widget'
			});

			if (stage === 'view') {
				eventProperties.target = 'component';
			}

			if (eventOptions.extraProperties) {
				Object.assign(eventProperties, eventOptions.extraProperties);
			}

			return eventProperties;
		}

		static getEventProperties(card, stage, sourceEvent) {
			let properties;
			try {
				properties = JSON.parse(card.getAttribute('data-showcase-product-event-properties') || '');
			} catch (error) {
				ShowcaseProductEventTracker.logFailure('invalid_properties_json', stage, sourceEvent, '', ShowcaseProductEventTracker.getProdCode(card), error);
				return null;
			}

			if (!properties || typeof properties !== 'object') {
				ShowcaseProductEventTracker.logFailure('missing_required_properties', stage, sourceEvent, '', '', null);
				return null;
			}

			const requiredKeys = [
				'prod_code',
				'menu_code',
				'widget_code',
				'showcase_code',
				'sort_type',
				'slot_index',
				'page_no',
				'ranking_source',
				'ranking_fallback_reason',
				'policy_snapshot_id'
			];

			for (let i = 0; i < requiredKeys.length; i++) {
				if (!Object.prototype.hasOwnProperty.call(properties, requiredKeys[i])) {
					ShowcaseProductEventTracker.logFailure('missing_required_properties', stage, sourceEvent, properties.widget_code || '', properties.prod_code || '', null);
					return null;
				}
			}

			if (properties.ranking_fallback_reason === null) {
				properties.ranking_fallback_reason = '';
			}

			return properties;
		}

		static clearIntersectionTimer(card) {
			if (!ShowcaseProductEventTracker.intersectionTimers.has(card)) {
				return;
			}

			window.clearTimeout(ShowcaseProductEventTracker.intersectionTimers.get(card));
			ShowcaseProductEventTracker.intersectionTimers.delete(card);
		}

		static flushQueue() {
			const queue = window.__showcaseProductEventTrackerQueue;
			if (!Array.isArray(queue) || queue.length === 0) {
				window.__showcaseProductEventTrackerQueue = [];
				return;
			}

			window.__showcaseProductEventTrackerQueue = [];
			queue.forEach(function(item) {
				if (!item || item.type !== 'scan') {
					return;
				}

				ShowcaseProductEventTracker.scan(item.widgetCode);
			});
		}

		static getProdCode(card) {
			try {
				const properties = JSON.parse(card.getAttribute('data-showcase-product-event-properties') || '{}');
				return properties && properties.prod_code ? properties.prod_code : '';
			} catch (error) {
				return '';
			}
		}

		static logFailure(reason, stage, sourceEvent, widgetCode, prodCode, error) {
			try {
				const key = [reason, stage, sourceEvent, widgetCode].join(':');
				if (ShowcaseProductEventTracker.loggedFailures.has(key)) {
					return;
				}

				ShowcaseProductEventTracker.loggedFailures.add(key);
				if (window.console && typeof window.console.error === 'function') {
					window.console.error('[ShowcaseProductEventTracker]', {
						reason: reason,
						stage: stage,
						sourceEvent: sourceEvent,
						widgetCode: widgetCode,
						prodCode: prodCode,
						error: error
					});
				}
			} catch (_error) {
			}
		}
	}

	ShowcaseProductEventTracker.VIEW_EVENT = 'view_component_product_showcase_widget';
	ShowcaseProductEventTracker.CLICK_EVENT = 'click_product_showcase_widget';
	ShowcaseProductEventTracker.IMPRESSION_SOURCE_VIEWPORT = 'viewport';
	ShowcaseProductEventTracker.IMPRESSION_SOURCE_CLICK = 'click';
	ShowcaseProductEventTracker.VIEW_DELAY = 500;
	ShowcaseProductEventTracker.initialized = false;
	ShowcaseProductEventTracker.observedCards = new WeakSet();
	ShowcaseProductEventTracker.viewedCards = new WeakSet();
	ShowcaseProductEventTracker.intersectionTimers = new WeakMap();
	ShowcaseProductEventTracker.loggedFailures = new Set();
	ShowcaseProductEventTracker.observer = null;

	window.ShowcaseProductEventTracker = ShowcaseProductEventTracker;

	function bootstrapShowcaseProductEventTracker() {
		try {
			ShowcaseProductEventTracker.init();
		} catch (error) {
			ShowcaseProductEventTracker.logFailure('unknown_error', 'init', '', '', '', error);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bootstrapShowcaseProductEventTracker);
	} else {
		bootstrapShowcaseProductEventTracker();
	}
})(window, document);
