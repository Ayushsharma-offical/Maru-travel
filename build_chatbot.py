import sys

suffix = """========================================================= */

  function renderSearchResults(results) {
    clearLiveBlock();
    var wrap = el("div", {
      class: "maru-chat-options",
      "data-maru-live": "1"
    });

    if (results.length === 0) {
      wrap.appendChild(el("div", { class: "maru-empty-state" }, [
        document.createTextNode("No matching answers found.")
      ]));
      wrap.appendChild(backToMenuChip());
    } else {
      results.forEach(function (res) {
        var btn = el("button", { class: "maru-option-btn", type: "button" }, [
          el("span", {}, [document.createTextNode(res.item.q)]),
          el("i", { class: "fas fa-chevron-right trailing" })
        ]);
        btn.addEventListener("click", function () {
          DOM.searchInput.value = "";
          openAnswer(res.category, res.item);
        });
        wrap.appendChild(btn);
      });
      wrap.appendChild(backToMenuChip());
    }

    DOM.bodyEl.appendChild(wrap);
    scrollToBottom();
  }

  function handleSearchInput(e) {
    var val = e.target.value;
    if (val.trim().length < 2) {
      return;
    }
    var results = searchQuestions(val);
    results = results.slice(0, 5);
    renderSearchResults(results);
  }

  /* ===============================================================
   *  SECTION 10 — LEAD CAPTURE (Fallback)
   * =============================================================== */

  function renderLeadCapture() {
    clearLiveBlock();
    var wrap = el("div", {
      class: "maru-chat-options",
      "data-maru-live": "1"
    });

    var form = el("form", { class: "maru-lead-form" });
    
    var nameInput = el("input", { type: "text", placeholder: "Your Name", required: "true" });
    var contactInput = el("input", { type: "text", placeholder: "Phone or Email", required: "true" });
    var msgInput = el("textarea", { placeholder: "How can we help?", rows: "3", required: "true" });
    var submitBtn = el("button", { class: "maru-lead-submit", type: "submit" }, [
      document.createTextNode("Send Message")
    ]);
    
    form.appendChild(el("label", {}, [document.createTextNode("Name")]));
    form.appendChild(nameInput);
    form.appendChild(el("label", {}, [document.createTextNode("Contact Info")]));
    form.appendChild(contactInput);
    form.appendChild(el("label", {}, [document.createTextNode("Question")]));
    form.appendChild(msgInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameInput.value;
      var contact = contactInput.value;
      var msg = msgInput.value;
      
      if (!name || !contact || !msg) return;

      appendUserBubble("Sent: " + msg);
      
      showTypingThen(function () {
        appendBotBubble("Thank you, " + name + "! We have received your message and will get back to you at " + contact + " very shortly.");
        // renderPostAnswerChips(MaruConfig.categories[0]); // could add chips back, but this is fine.
      });
    });

    wrap.appendChild(form);
    wrap.appendChild(backToMenuChip());

    DOM.bodyEl.appendChild(wrap);
    scrollToBottom();
  }

  /* ===============================================================
   *  SECTION 11 — INITIALIZATION & EVENT LISTENERS
   * =============================================================== */

  function toggleChat() {
    State.isOpen = !State.isOpen;
    if (State.isOpen) {
      DOM.windowEl.classList.add("active");
      DOM.badge.classList.add("hidden");
      State.unread = false;
      
      if (!State.hasGreeted) {
        State.hasGreeted = true;
        showTypingThen(function() {
          appendBotBubble(MaruConfig.greeting);
          renderMainMenu();
        });
      }
    } else {
      DOM.windowEl.classList.remove("active");
    }
    saveState();
  }

  function init() {
    injectStyles();
    buildWidgetShell();
    loadState();

    DOM.toggleBtn.addEventListener("click", toggleChat);
    DOM.closeBtn.addEventListener("click", toggleChat);
    DOM.minimizeBtn.addEventListener("click", toggleChat);
    
    DOM.searchInput.addEventListener("keyup", function(e) {
       handleSearchInput(e);
    });

    if (State.history.length > 0) {
      State.history.forEach(function(msg) {
        if (msg.type === "bot") {
          appendBotBubble(msg.text, false);
        } else {
          appendUserBubble(msg.text, false);
        }
      });
      if (State.currentCategoryId) {
         var cat = getCategory(State.currentCategoryId);
         if (cat) renderQuestionList(cat);
         else renderMainMenu();
      } else {
         renderMainMenu();
      }
    } else {
      setTimeout(function() {
        if (!State.isOpen) {
          DOM.badge.classList.remove("hidden");
          State.unread = true;
          saveState();
        }
      }, 3000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
"""

try:
    with open("chatbot_prefix.txt", "r", encoding="utf-8") as f:
        prefix = f.read()
    
    full_code = prefix + suffix
    
    with open("chatbot.js", "w", encoding="utf-8") as f:
        f.write(full_code)
    print("Successfully built chatbot.js")
except Exception as e:
    print(f"Error: {e}")
