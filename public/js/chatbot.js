class EduAIChatbot {
  constructor() {
    this.chatMessages = document.getElementById("chatbotMessages");
    this.messageInput = document.getElementById("chatbotInput");
    this.sendButton = document.getElementById("chatbotSend");
    this.chatForm = document.getElementById("chatbotForm");
    this.loadingIndicator = document.getElementById("chatbotLoading");
    this.preferredCourses = document.getElementById("preferred-courses");

    // Course recommendations mapping
    this.courseMap = [
      {
        name: "Web Development Beginner",
        keywords: ["web development beginner", "html", "css"],
        link: "web-beginner-html.html",
      },
      {
        name: "Web Development Intermediate",
        keywords: [
          "web development intermediate",
          "javascript",
          "react",
          "vue",
          "angular",
        ],
        link: "web-intermediate-html.html",
      },
      {
        name: "Web Development Advanced",
        keywords: [
          "web development advanced",
          "devops",
          "ci/cd",
          "docker",
          "microservices",
        ],
        link: "web-advanced-nodejs.html",
      },
      {
        name: "Data Science Python",
        keywords: [
          "data science",
          "python",
          "pandas",
          "numpy",
          "machine learning",
        ],
        link: "courses.html#data-science",
      },
      {
        name: "AI & Machine Learning",
        keywords: [
          "ai",
          "artificial intelligence",
          "machine learning",
          "deep learning",
        ],
        link: "courses.html#ai-ml",
      },
      {
        name: "Cybersecurity",
        keywords: [
          "cybersecurity",
          "security",
          "ethical hacking",
          "penetration testing",
        ],
        link: "courses.html#cybersecurity",
      },
    ];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Form submission
    this.chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    // Enter key press
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-focus on input
    this.messageInput.focus();
  }

  async sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    this.messageInput.value = "";
    this.addMessage(message, "user");
    this.showLoading();

    try {
      // Try API first
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      this.hideLoading();

      if (!response.ok) {
        throw new Error(data.error || "API Error");
      }

      // Add bot response (even if it's a fallback)
      this.addMessage(data.reply, "bot");
      this.showCourseRecommendations(message);
    } catch (error) {
      this.hideLoading();

      // Fallback to local AI logic
      if (typeof window.getAIResponse === "function") {
        const fallbackResponse = window.getAIResponse(message);
        this.addMessage(fallbackResponse, "bot");
        this.showCourseRecommendations(message);
      } else {
        // Final fallback responses
        const fallbackResponses = {
          hello:
            "Hello! I'm your CodeMateAI assistant. How can I help you with your learning today?",
          "web development":
            "Web development is a great career choice! Start with HTML, CSS, and JavaScript basics. Would you like course recommendations?",
          programming:
            "Programming opens many doors! What type of programming interests you - web development, data science, or mobile apps?",
          default:
            "I'm here to help with your educational journey. Ask me about courses, programming, or career advice!",
        };

        const lowerMessage = message.toLowerCase();
        let response = fallbackResponses.default;

        for (const [key, value] of Object.entries(fallbackResponses)) {
          if (lowerMessage.includes(key) && key !== "default") {
            response = value;
            break;
          }
        }

        this.addMessage(response, "bot");
        this.showCourseRecommendations(message);
      }
    }
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${sender}`;

    const avatarIcon = sender === "user" ? "fas fa-user" : "fas fa-robot";

    messageDiv.innerHTML = `
      <div class="chatbot-avatar">
        <i class="${avatarIcon}"></i>
      </div>
      <div class="chatbot-bubble">
        ${this.formatMessage(content)}
      </div>
    `;

    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  formatMessage(content) {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    content = content.replace(
      urlRegex,
      '<a href="$1" target="_blank" style="font-size: 14px;">$1</a>'
    );

    // Convert line breaks to <br>
    content = content.replace(/\n/g, "<br>");

    // Wrap content in a span to ensure consistent styling
    return `<span style="font-size: 14px; line-height: 1.4;">${content}</span>`;
  }

  showLoading() {
    this.loadingIndicator.style.display = "block";
    this.sendButton.disabled = true;
    this.messageInput.disabled = true;
    this.scrollToBottom();
  }

  hideLoading() {
    this.loadingIndicator.style.display = "none";
    this.sendButton.disabled = false;
    this.messageInput.disabled = false;
    this.messageInput.focus();
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "chatbot-message bot";
    errorDiv.innerHTML = `
      <div class="chatbot-avatar">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="chatbot-bubble" style="background: #ffebee; color: #c62828; border-left: 4px solid #f44336;">
        <strong>Error:</strong> ${message}
      </div>
    `;

    this.chatMessages.appendChild(errorDiv);
    this.scrollToBottom();

    // Remove error message after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }

  showCourseRecommendations(userMessage) {
    const input = userMessage.toLowerCase();
    let recommended = [];

    // Find matching courses
    for (const course of this.courseMap) {
      if (course.keywords.some((kw) => input.includes(kw))) {
        recommended.push(course);
      }
    }

    // Show general recommendations for certain keywords
    if (
      input.includes("i don't know what to learn") ||
      input.includes("dont know what to learn") ||
      input.includes("confused") ||
      input.includes("which course") ||
      input.includes("what should i learn") ||
      input.includes("programming") ||
      input.includes("coding")
    ) {
      recommended = this.courseMap;
    }

    if (recommended.length > 0) {
      this.preferredCourses.innerHTML = `
        <div class="mb-2 fw-bold" style="color:#1976d2;">
          <i class="fas fa-graduation-cap me-2"></i>Recommended Courses for You:
        </div>
        <div class="d-flex flex-wrap gap-2">
          ${recommended
            .map(
              (course) =>
                `<a href='${course.link}' class='btn btn-outline-primary btn-sm' style='border-radius: 20px;'>${course.name}</a>`
            )
            .join("")}
        </div>
      `;
    } else {
      this.preferredCourses.innerHTML = "";
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }, 100);
  }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new EduAIChatbot();
});
