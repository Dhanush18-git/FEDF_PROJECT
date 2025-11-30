import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRoleSelect, setLoginRoleSelect] = useState("user");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const CREDENTIALS = {
    admin: { username: "admin123", password: "admin@123" },
    user: { username: "user123", password: "user@123" },
    professional: { username: "pro123", password: "pro@123" },
    support: { username: "support123", password: "support@123" },
  };

  const [role, setRole] = useState("user");

  // ---------------------------
  // PAGE NAVIGATION
  // ---------------------------
  const [currentPage, setCurrentPage] = useState("dashboard"); // "home", "dashboard", "bookings", "profile", "faq", "contact"
  const [previousPage, setPreviousPage] = useState(null); // to support Back button

  const navigateTo = (page) => {
    if (page === currentPage) return;
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (previousPage) {
      setCurrentPage(previousPage);
      setPreviousPage(null); // simple one-step back
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const roleToUse = loginRoleSelect;
    const cred = CREDENTIALS[roleToUse];
    if (!cred) {
      setLoginError("Invalid role selected.");
      return;
    }
    if (loginUsername === cred.username && loginPassword === cred.password) {
      setIsLoggedIn(true);
      setLoginError("");
      setRole(roleToUse);
      setCurrentPage("dashboard");
      setPreviousPage(null);
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
    setRole("user");
    setCurrentPage("dashboard");
    setPreviousPage(null);
  };

  // ---------------------------
  // ORIGINAL APP STATES
  // ---------------------------
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Plumber",
      provider: "Kotte Jaikiran",
      rating: 4.8,
      price: 500,
      contact: { phone: "9876543210", email: "kotte.plumber@gmail.com" },
    },
    {
      id: 2,
      name: "Electrician",
      provider: "Rama Krishna",
      rating: 4.6,
      price: 700,
      contact: { phone: "9123456789", email: "krishna.electric@gmail.com" },
    },
    {
      id: 3,
      name: "Graphic Designer",
      provider: "Shiva",
      rating: 4.9,
      price: 1200,
      contact: { phone: "9988776655", email: "shiva.design@gmail.com" },
    },
    {
      id: 4,
      name: "Web Developer",
      provider: "Anjali",
      rating: 4.7,
      price: 2500,
      contact: { phone: "9876543210", email: "anjali.webdev@gmail.com" },
    },
    {
      id: 5,
      name: "Electrician",
      provider: "Ramesh",
      rating: 4.5,
      price: 800,
      contact: { phone: "9123456780", email: "ramesh.electrician@gmail.com" },
    },
    {
      id: 6,
      name: "Home Tutor",
      provider: "Priya",
      rating: 4.8,
      price: 1500,
      contact: { phone: "9001122334", email: "priya.tutor@gmail.com" },
    },
    {
      id: 7,
      name: "Plumber",
      provider: "Vikram",
      rating: 4.3,
      price: 700,
      contact: { phone: "9090909090", email: "vikram.plumber@gmail.com" },
    },
    {
      id: 8,
      name: "Digital Marketer",
      provider: "Kavya",
      rating: 4.9,
      price: 3000,
      contact: { phone: "8811223344", email: "kavya.marketing@gmail.com" },
    },
  ]);

  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    provider: "",
    rating: "",
    price: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [ownerProfile, setOwnerProfile] = useState({
    name: "NUNNA DHANUSH BABU",
    email: "dhanushnunna18@gmail.com",
    phone: "9618613063",
    bio: "Experienced service professional dedicated to customer satisfaction.",
  });

  // basic user profile (for Profile page)
  const [userProfile, setUserProfile] = useState({
    name: "Demo User",
    email: "user123@proconnect.com",
    phone: "9999999999",
    address: "Hyderabad, India",
  });

  // Payment & Address states
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiDetails, setUpiDetails] = useState({ upiId: "" });
  const [netBankingDetails, setNetBankingDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });
  const [walletDetails, setWalletDetails] = useState({
    walletApp: "",
    walletNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [appFeedback, setAppFeedback] = useState("");
  const [adminPayment, setAdminPayment] = useState({
    amount: "",
    referenceId: "",
  });
  const [jobStatus, setJobStatus] = useState({});

  // Support tickets & form state
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    issueType: "General",
    message: "",
  });

  // contact page form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddService = (e) => {
    e.preventDefault();
    if (
      !newService.name ||
      !newService.provider ||
      !newService.price ||
      !newService.contactPhone ||
      !newService.contactEmail
    ) {
      alert("Please fill in all required fields!");
      return;
    }
    const serviceToAdd = {
      id: Date.now(),
      name: newService.name,
      provider: newService.provider,
      rating: newService.rating ? parseFloat(newService.rating) : 5.0,
      price: parseFloat(newService.price),
      contact: {
        phone: newService.contactPhone,
        email: newService.contactEmail,
      },
    };
    setServices([...services, serviceToAdd]);
    setNewService({
      name: "",
      provider: "",
      rating: "",
      price: "",
      contactPhone: "",
      contactEmail: "",
    });
    alert("✅ Service added successfully!");
  };

  const handleBooking = (service) => {
    setBookings([service]); // single hire
    setShowCart(true);
    setJobStatus({ ...jobStatus, [service.id]: "booked" });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (
      (paymentMethod === "card" &&
        (!paymentDetails.nameOnCard ||
          !paymentDetails.cardNumber ||
          !paymentDetails.expiry ||
          !paymentDetails.cvv)) ||
      (paymentMethod === "upi" && !upiDetails.upiId) ||
      (paymentMethod === "netbanking" &&
        (!netBankingDetails.bankName ||
          !netBankingDetails.accountNumber ||
          !netBankingDetails.ifsc)) ||
      (paymentMethod === "wallet" &&
        (!walletDetails.walletApp || !walletDetails.walletNumber)) ||
      !addressDetails.street ||
      !addressDetails.city ||
      !addressDetails.state ||
      !addressDetails.pincode
    ) {
      alert("⚠ Please fill all payment & address details!");
      return;
    }
    setPaymentSuccess(true);
  };

  const handleJobStatus = (serviceId, status) => {
    setJobStatus({ ...jobStatus, [serviceId]: status });
    alert(`Job status for service ID ${serviceId}: ${status.toUpperCase()}`);
  };

  const handleFeedbackSubmit = () => {
    if (!appFeedback) {
      alert("⚠ Please provide feedback before submitting!");
      return;
    }
    setFeedbackList([...feedbackList, appFeedback]);
    setAppFeedback("");
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 2500);
  };

  // Support handlers
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportForm.name || !supportForm.email || !supportForm.message) {
      alert("⚠ Please fill all required support fields!");
      return;
    }

    const newTicket = {
      id: Date.now(),
      ...supportForm,
      status: "open",
      createdAt: new Date().toLocaleString(),
    };

    setSupportTickets([newTicket, ...supportTickets]);
    setSupportForm({
      name: "",
      email: "",
      issueType: "General",
      message: "",
    });

    alert("✅ Support request submitted. Our team will contact you soon.");
  };

  const handleTicketStatusChange = (id, newStatus) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  // Profile handlers
  const handleProfileChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  // Contact page handlers
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("⚠ Please fill all fields in contact form!");
      return;
    }
    alert("✅ Your message has been sent to ProConnect support team.");
    setContactForm({ name: "", email: "", message: "" });
  };

  // ---------------------------
  // LOGIN PAGE
  // ---------------------------
  if (!isLoggedIn) {
    return (
      <div className="fullscreen-center">
        <div className="center-card">
          <h1 style={{ margin: 0, fontSize: 28 }}>🔐 ProConnect Sign In</h1>
          <p style={{ opacity: 0.9, marginTop: 8 }}>
            Sign in with your account to continue to ProConnect.
          </p>

          <form
            onSubmit={handleLogin}
            style={{ marginTop: 12, display: "flex", flexDirection: "column" }}
          >
            <label style={{ textAlign: "left", marginBottom: 6 }}>Role</label>
            <select
              value={loginRoleSelect}
              onChange={(e) => setLoginRoleSelect(e.target.value)}
              className="full-input"
            >
              <option value="admin">Admin</option>
              <option value="professional">Professional</option>
              <option value="user">User</option>
              <option value="support">Customer Support</option>
            </select>

            <input
              className="full-input"
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />

            {/* Password with show/hide toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                background: "rgba(10,10,20,0.9)",
                borderRadius: 10,
                paddingRight: 8,
              }}
            >
              <input
                className="full-input"
                style={{
                  border: "none",
                  background: "transparent",
                  marginTop: 0,
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 20,
                  padding: "0 6px",
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                👁
              </button>
            </div>

            {loginError && (
              <div
                style={{
                  background: "rgba(255,0,0,0.08)",
                  color: "#ffdddd",
                  padding: 8,
                  borderRadius: 8,
                  marginTop: 10,
                  fontWeight: 600,
                }}
              >
                {loginError}
              </div>
            )}

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 8,
              background: "rgba(0,0,0,0.25)",
              fontSize: 13,
              textAlign: "left",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>📘 Demo Credentials</h4>
            <p style={{ margin: "2px 0" }}>
              <b>Admin:</b> admin123 / admin@123
            </p>
            <p style={{ margin: "2px 0" }}>
              <b>Professional:</b> pro123 / pro@123
            </p>
            <p style={{ margin: "2px 0" }}>
              <b>User:</b> user123 / user@123
            </p>
            <p style={{ margin: "2px 0" }}>
              <b>Support:</b> support123 / support@123
            </p>
            <small style={{ opacity: 0.8 }}>
              You can change usernames & passwords in the CREDENTIALS object.
            </small>
          </div>
        </div>
      </div>
    );
  }

  // Payment success + feedback submitted page
  if (paymentSuccess && feedbackSubmitted) {
    return (
      <div className="App success-page">
        <h1 style={{ fontSize: "80px", color: "green" }}>✅</h1>
        <h2>Feedback Submitted Successfully!</h2>
        <p>Thank you for your valuable feedback.</p>
        <button
          onClick={() => {
            setPaymentSuccess(false);
            setShowCart(false);
            setRole("user");
            setCurrentPage("dashboard");
            setPreviousPage(null);
          }}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔙 Go Back to App
        </button>
      </div>
    );
  }

  // Payment success page (before feedback)
  if (paymentSuccess) {
    return (
      <div className="App success-page">
        <h1 style={{ fontSize: "80px", color: "green" }}>✅</h1>
        <h2>Payment Successful!</h2>
        <p>Your order has been booked successfully.</p>

        <div className="feedback-section">
          <h3>📝 Please share your feedback about the app</h3>
          <textarea
            placeholder="Write your feedback here..."
            value={appFeedback}
            onChange={(e) => setAppFeedback(e.target.value)}
            style={{
              width: "80%",
              height: "100px",
              marginTop: "10px",
              borderRadius: "10px",
              padding: "10px",
            }}
          />
          <br />
          <button
            onClick={handleFeedbackSubmit}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    );
  }

  // Cart page
  if (showCart) {
    return (
      <div className="App cart-page">
        <button
          onClick={handleLogout}
          style={{
            float: "right",
            margin: "20px",
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#dc3545",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>

        <h2>🛒 Your Cart</h2>
        {bookings.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Provider: {item.provider}</p>
            <p>Contact: {item.contact.phone}</p>
            <p>Email: {item.contact.email}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}

        <div className="payment-section">
          <h3>💳 Choose Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
            <option value="wallet">Wallet</option>
          </select>

          <form onSubmit={handlePaymentSubmit}>
            {paymentMethod === "card" && (
              <>
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={paymentDetails.nameOnCard}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      nameOnCard: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiry}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiry: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                />
              </>
            )}

            {paymentMethod === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiDetails.upiId}
                onChange={(e) =>
                  setUpiDetails({ ...upiDetails, upiId: e.target.value })
                }
              />
            )}

            {paymentMethod === "netbanking" && (
              <>
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={netBankingDetails.bankName}
                  onChange={(e) =>
                    setNetBankingDetails({
                      ...netBankingDetails,
                      bankName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={netBankingDetails.accountNumber}
                  onChange={(e) =>
                    setNetBankingDetails({
                      ...netBankingDetails,
                      accountNumber: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="IFSC Code"
                  value={netBankingDetails.ifsc}
                  onChange={(e) =>
                    setNetBankingDetails({
                      ...netBankingDetails,
                      ifsc: e.target.value,
                    })
                  }
                />
              </>
            )}

            {paymentMethod === "wallet" && (
              <>
                <select
                  value={walletDetails.walletApp}
                  onChange={(e) =>
                    setWalletDetails({
                      ...walletDetails,
                      walletApp: e.target.value,
                    })
                  }
                >
                  <option value="">Select Wallet App</option>
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="GooglePay">Google Pay</option>
                  <option value="AmazonPay">Amazon Pay</option>
                </select>
                <input
                  type="text"
                  placeholder="Wallet Mobile Number"
                  value={walletDetails.walletNumber}
                  onChange={(e) =>
                    setWalletDetails({
                      ...walletDetails,
                      walletNumber: e.target.value,
                    })
                  }
                />
              </>
            )}

            <h4>📦 Delivery Address</h4>
            <input
              type="text"
              placeholder="Street"
              value={addressDetails.street}
              onChange={(e) =>
                setAddressDetails({
                  ...addressDetails,
                  street: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={addressDetails.city}
              onChange={(e) =>
                setAddressDetails({
                  ...addressDetails,
                  city: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="State"
              value={addressDetails.state}
              onChange={(e) =>
                setAddressDetails({
                  ...addressDetails,
                  state: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              value={addressDetails.pincode}
              onChange={(e) =>
                setAddressDetails({
                  ...addressDetails,
                  pincode: e.target.value,
                })
              }
            />

            <button type="submit">💰 Confirm & Pay</button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------
  // MAIN APP UI (AFTER LOGIN)
  // ---------------------------
  return (
    <div className="App">
      <header className="header">
        <h1>🌐 ProConnect Platform</h1>
        <p>Find and hire the right professional for your needs</p>
      </header>

      {/* TOP NAVBAR FOR PAGES */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        <button
          onClick={() => navigateTo("home")}
          className={currentPage === "home" ? "nav-btn active" : "nav-btn"}
        >
          🏠 Home
        </button>
        <button
          onClick={() => navigateTo("dashboard")}
          className={currentPage === "dashboard" ? "nav-btn active" : "nav-btn"}
        >
          📊 Role Dashboard
        </button>
        <button
          onClick={() => navigateTo("bookings")}
          className={currentPage === "bookings" ? "nav-btn active" : "nav-btn"}
        >
          📅 My Bookings
        </button>
        <button
          onClick={() => navigateTo("profile")}
          className={currentPage === "profile" ? "nav-btn active" : "nav-btn"}
        >
          👤 Profile
        </button>
        <button
          onClick={() => navigateTo("faq")}
          className={currentPage === "faq" ? "nav-btn active" : "nav-btn"}
        >
          ❓ FAQ
        </button>
        <button
          onClick={() => navigateTo("contact")}
          className={currentPage === "contact" ? "nav-btn active" : "nav-btn"}
        >
          📩 Contact
        </button>
      </nav>

      {/* BACK BUTTON (PREVIOUS PAGE) */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <button
          onClick={handleBack}
          disabled={!previousPage}
          className="nav-btn"
          style={{ opacity: previousPage ? 1 : 0.5 }}
        >
          ⬅ Back to Previous Page
        </button>
      </div>

      {/* ROLE SELECT + LOGOUT (ALWAYS ON TOP) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 980,
          margin: "0 auto 16px",
        }}
      >
        <div className="role-select" style={{ marginTop: 12 }}>
          <label style={{ marginRight: 8 }}>Select Role: </label>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            style={{ padding: 8, borderRadius: 8 }}
          >
            <option value="admin">Admin</option>
            <option value="professional">Professional</option>
            <option value="user">User</option>
            <option value="support">Customer Support</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 15px",
              marginTop: "10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ---------------- HOME PAGE ---------------- */}
      {currentPage === "home" && (
        <div className="page-center">
          <div className="card">
            <h2>Welcome to ProConnect 👋</h2>
            <p>
              ProConnect is a smart platform that helps customers,
              professionals, admins, and support teams work together in one
              place.
            </p>

            {/* Feature Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
                marginTop: 14,
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <h4>🎯 For Users</h4>
                <p style={{ fontSize: 14 }}>
                  Search, compare, and book trusted professionals for any task
                  in just a few clicks.
                </p>
              </div>
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <h4>🛠️ For Professionals</h4>
                <p style={{ fontSize: 14 }}>
                  Receive bookings, manage job status, and grow your client base
                  online.
                </p>
              </div>
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <h4>📈 For Admin</h4>
                <p style={{ fontSize: 14 }}>
                  Control services, pricing, and monitor platform activity from
                  a single dashboard.
                </p>
              </div>
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <h4>📞 Support Team</h4>
                <p style={{ fontSize: 14 }}>
                  Track tickets and keep users happy with quick resolution.
                </p>
              </div>
            </div>

            {/* How it works */}
            <div style={{ marginTop: 18 }}>
              <h3>⚙️ How ProConnect Works</h3>
              <ol style={{ marginTop: 8, paddingLeft: 18, fontSize: 14 }}>
                <li>
                  Login and choose your role (Admin / User / Professional /
                  Support).
                </li>
                <li>
                  Users search and hire a service from the Role Dashboard.
                </li>
                <li>Payment and address are collected (demo flow only).</li>
                <li>
                  Professionals update job progress, Support tracks issues.
                </li>
              </ol>
            </div>

            <button
              onClick={() => navigateTo("dashboard")}
              style={{
                marginTop: 14,
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#6c5ce7",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Go to Role Dashboard ➡
            </button>
          </div>
        </div>
      )}

      {/* ---------------- ROLE DASHBOARD (MAIN UI) ---------------- */}
      {currentPage === "dashboard" && (
        <div className="page-center">
          <div style={{ width: "100%", maxWidth: 980 }}>
            {/* Quick stats */}
            <div className="card" style={{ marginBottom: 14 }}>
              <h3>📊 Platform Overview</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: "rgba(108,92,231,0.12)",
                  }}
                >
                  <div style={{ fontSize: 13, opacity: 0.8 }}>
                    Total Services
                  </div>
                  <div style={{ fontSize: 22, fontWeight: "bold" }}>
                    {services.length}
                  </div>
                </div>
                <div
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: "rgba(39,174,96,0.12)",
                  }}
                >
                  <div style={{ fontSize: 13, opacity: 0.8 }}>
                    Total Bookings
                  </div>
                  <div style={{ fontSize: 22, fontWeight: "bold" }}>
                    {bookings.length}
                  </div>
                </div>
                <div
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: "rgba(241,196,15,0.12)",
                  }}
                >
                  <div style={{ fontSize: 13, opacity: 0.8 }}>
                    Active Tickets
                  </div>
                  <div style={{ fontSize: 22, fontWeight: "bold" }}>
                    {supportTickets.length}
                  </div>
                </div>
                <div
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: "rgba(52,152,219,0.12)",
                  }}
                >
                  <div style={{ fontSize: 13, opacity: 0.8 }}>
                    Current Role View
                  </div>
                  <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {role.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* ADMIN ROLE */}
            {role === "admin" && (
              <div className="admin-section">
                <div className="card">
                  <h2>👑 Admin Dashboard</h2>
                  <p>
                    Manage all services, view basic platform data, and support
                    all users.
                  </p>
                </div>

                <div className="card">
                  <h3>➕ Add New Service</h3>
                  <form
                    onSubmit={handleAddService}
                    className="add-service-form"
                  >
                    <input
                      type="text"
                      placeholder="Service Name (e.g., Plumber)"
                      value={newService.name}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Provider Name"
                      value={newService.provider}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          provider: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price (e.g., 500)"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          price: e.target.value,
                        })
                      }
                      min="0"
                      step="0.01"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Rating (Optional, e.g., 4.5)"
                      value={newService.rating}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          rating: e.target.value,
                        })
                      }
                    />
                    <input
                      type="tel"
                      placeholder="Contact Phone"
                      value={newService.contactPhone}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          contactPhone: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      value={newService.contactEmail}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          contactEmail: e.target.value,
                        })
                      }
                      required
                    />
                    <button type="submit">Submit Service</button>
                  </form>
                </div>

                <div className="card">
                  <h3>📋 Current Services</h3>
                  {services.length === 0 ? (
                    <p>No services added yet.</p>
                  ) : (
                    <ul>
                      {services.map((s) => (
                        <li key={s.id} className="admin-service-item">
                          ID: {s.id} | {s.name} | Provider: {s.provider} |
                          Price: ₹{s.price} | Rating: ⭐ {s.rating}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* PROFESSIONAL ROLE */}
            {role === "professional" && (
              <div className="professional-section card">
                <h2>🔧 Professional Dashboard</h2>

                <h3>👤 My Profile</h3>
                <p>
                  Name: <b>{ownerProfile.name}</b>
                </p>
                <p>Email: {ownerProfile.email}</p>
                <p>
                  Bio: <em>{ownerProfile.bio}</em>
                </p>

                <h3>💼 Assigned Jobs</h3>
                {bookings.length === 0 ? (
                  <p>No jobs currently assigned (bookings list is empty).</p>
                ) : (
                  <ul>
                    {bookings.map((job) => (
                      <li key={job.id} className="job-item">
                        Job: {job.name} (ID: {job.id})
                        <br />
                        Status:{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color:
                              jobStatus[job.id] === "completed"
                                ? "green"
                                : "orange",
                          }}
                        >
                          {jobStatus[job.id] || "Booked"}
                        </span>
                        <br />
                        <div className="status-controls">
                          <button
                            onClick={() =>
                              handleJobStatus(job.id, "in_progress")
                            }
                            disabled={jobStatus[job.id] === "completed"}
                          >
                            Start Job
                          </button>
                          <button
                            onClick={() =>
                              handleJobStatus(job.id, "completed")
                            }
                            style={{ backgroundColor: "#28a745" }}
                            disabled={jobStatus[job.id] === "completed"}
                          >
                            Complete Job
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* CUSTOMER SUPPORT ROLE */}
            {role === "support" && (
              <div className="support-section card">
                <h2>📞 Customer Support Dashboard</h2>
                <p>
                  Logged in as: <b>Customer Support</b>
                </p>

                {supportTickets.length === 0 ? (
                  <p>
                    No support tickets yet. Users can submit issues from the
                    User panel.
                  </p>
                ) : (
                  <ul>
                    {supportTickets.map((ticket) => (
                      <li
                        key={ticket.id}
                        className="support-ticket-item"
                      >
                        <b>Ticket ID:</b> {ticket.id}
                        <br />
                        <b>Name:</b> {ticket.name}
                        <br />
                        <b>Email:</b> {ticket.email}
                        <br />
                        <b>Issue Type:</b> {ticket.issueType}
                        <br />
                        <b>Message:</b> {ticket.message}
                        <br />
                        <b>Created At:</b> {ticket.createdAt}
                        <br />
                        <b>Status:</b>{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color:
                              ticket.status === "closed"
                                ? "lightgreen"
                                : ticket.status === "in_progress"
                                ? "orange"
                                : "red",
                          }}
                        >
                          {ticket.status.toUpperCase()}
                        </span>
                        <br />
                        <div
                          className="status-controls"
                          style={{ marginTop: 8 }}
                        >
                          <label>Update Status: </label>
                          <select
                            value={ticket.status}
                            onChange={(e) =>
                              handleTicketStatusChange(
                                ticket.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="open">Open</option>
                            <option value="in_progress">
                              In Progress
                            </option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* USER ROLE */}
            {role === "user" && (
              <div className="card">
                <h2>🔍 Find Professionals</h2>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ul>
                  {filteredServices.map((s) => (
                    <li key={s.id}>
                      <b>{s.name}</b> by {s.provider} ⭐ {s.rating}
                      <br />
                      💰 Price: ₹{s.price}
                      <br />
                      <button onClick={() => handleBooking(s)}>
                        🤝 Hire
                      </button>
                    </li>
                  ))}
                </ul>

                <hr />

                {/* Feedback */}
                <div
                  className="feedback-section"
                  style={{ marginTop: 12 }}
                >
                  <h3>📝 Share Feedback</h3>
                  <textarea
                    placeholder="Write feedback..."
                    value={appFeedback}
                    onChange={(e) => setAppFeedback(e.target.value)}
                    style={{
                      width: "90%",
                      height: 80,
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                  <br />
                  <button
                    onClick={handleFeedbackSubmit}
                    style={{
                      marginTop: 8,
                      background: "#6c5ce7",
                      color: "#fff",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Submit Feedback
                  </button>
                </div>

                <hr style={{ marginTop: 20, marginBottom: 20 }} />

                {/* Customer Support Contact Form */}
                <div
                  className="support-section"
                  style={{ marginTop: 12 }}
                >
                  <h3>📩 Need Help? Contact Customer Support</h3>
                  <form onSubmit={handleSupportSubmit}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={supportForm.name}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={supportForm.email}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          email: e.target.value,
                        })
                      }
                    />
                    <select
                      value={supportForm.issueType}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          issueType: e.target.value,
                        })
                      }
                    >
                      <option value="General">General Query</option>
                      <option value="Payment">Payment Issue</option>
                      <option value="Booking">Booking Issue</option>
                      <option value="Technical">
                        Technical Problem
                      </option>
                    </select>
                    <textarea
                      placeholder="Describe your issue..."
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          message: e.target.value,
                        })
                      }
                      style={{
                        width: "90%",
                        height: 80,
                        padding: 8,
                        borderRadius: 8,
                        marginTop: 8,
                      }}
                    />
                    <br />
                    <button
                      type="submit"
                      style={{
                        marginTop: 8,
                        background: "#17a2b8",
                        color: "#fff",
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Submit Support Request
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- MY BOOKINGS PAGE ---------------- */}
      {currentPage === "bookings" && (
        <div className="page-center">
          <div className="card">
            <h2>📅 My Bookings</h2>
            {bookings.length === 0 ? (
              <p>You have not booked any services yet.</p>
            ) : (
              <ul>
                {bookings.map((b) => (
                  <li key={b.id}>
                    <b>{b.name}</b> by {b.provider}
                    <br />
                    Price: ₹{b.price}
                    <br />
                    Status:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color:
                          jobStatus[b.id] === "completed"
                            ? "green"
                            : jobStatus[b.id] === "in_progress"
                            ? "orange"
                            : "blue",
                      }}
                    >
                      {jobStatus[b.id] || "Booked"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => navigateTo("dashboard")}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#6c5ce7",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ⬅ Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* ---------------- PROFILE PAGE ---------------- */}
      {currentPage === "profile" && (
        <div className="page-center">
          <div className="card">
            <h2>👤 My Profile</h2>
            <form onSubmit={handleProfileSave}>
              <input
                type="text"
                placeholder="Name"
                value={userProfile.name}
                onChange={(e) =>
                  handleProfileChange("name", e.target.value)
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={userProfile.email}
                onChange={(e) =>
                  handleProfileChange("email", e.target.value)
                }
              />
              <input
                type="tel"
                placeholder="Phone"
                value={userProfile.phone}
                onChange={(e) =>
                  handleProfileChange("phone", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Address"
                value={userProfile.address}
                onChange={(e) =>
                  handleProfileChange("address", e.target.value)
                }
              />
              <button
                type="submit"
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Save Profile
              </button>
            </form>
            <p style={{ marginTop: 12, fontSize: 13, opacity: 0.8 }}>
              Note: This profile is stored only on the client side in this
              demo application.
            </p>
          </div>
        </div>
      )}

      {/* ---------------- FAQ PAGE ---------------- */}
      {currentPage === "faq" && (
        <div className="page-center">
          <div className="card">
            <h2>❓ Frequently Asked Questions</h2>
            <h4>1. What is ProConnect?</h4>
            <p>
              ProConnect is a service marketplace where users can find and hire
              professionals for different services like plumbing, electrician,
              tutors, and more.
            </p>
            <h4>2. How do I book a service?</h4>
            <p>
              Login as a <b>User</b>, go to the Role Dashboard, search for a
              service, and click on <b>Hire</b>. Then complete the payment flow.
            </p>
            <h4>3. Is real payment happening?</h4>
            <p>
              No. This is a demo academic project. Payment forms are for UI and
              flow simulation only.
            </p>
            <h4>4. How does customer support work?</h4>
            <p>
              Users can submit a support request from the User section. Support
              team (Support role) can track and update status of tickets.
            </p>
            <h4>5. Who manages the services?</h4>
            <p>
              The <b>Admin</b> role can add services and view all services
              available in the platform.
            </p>
          </div>
        </div>
      )}

      {/* ---------------- CONTACT PAGE ---------------- */}
      {currentPage === "contact" && (
        <div className="page-center">
          <div className="card">
            <h2>📩 Contact ProConnect</h2>
            <p>
              Have any questions or suggestions about this project? Send a
              message using the form below.
            </p>
            <form onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
              />
              <textarea
                placeholder="Your message..."
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value,
                  })
                }
                style={{
                  width: "90%",
                  height: 100,
                  padding: 8,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              />
              <br />
              <button
                type="submit"
                style={{
                  marginTop: 8,
                  background: "#007bff",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </form>

            <div style={{ marginTop: 16, fontSize: 14 }}>
              <p>
                📧 Demo Email:{" "}
                <b>support@proconnect-demo.com</b>
              </p>
              <p>📍 Location: Hyderabad, India</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
