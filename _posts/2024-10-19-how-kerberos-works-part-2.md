---
title: How Kerberos Works (Part 2)
date: 2024-10-19 09:41 +0800
tags: [Kerberos, AD]
categories: Research
image: /assets/img/2024-10-19-How-Kerberos-Works-Part-2/Cerberus.jpeg
alt: "Kerberos"
---

Today, I'll dive into Kerberos in detail. If you haven't read my previous post about how Kerberos works on a high level, check it out [here]({% post_url 2024-10-05-how-kerberos-works-part-1 %}).

## How Kerberos Works
Here's a diagram of the entire Kerberos Authentication Process in detail:
![Kerberos Authentication Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/Kerberos_Overview.png)

### 1. KRB_AS_REQ/Request TGT (Client to AS)
The user sends an **unencrypted message** to the AS, requesting to access a service. Here’s what it contains:

```
- Username (e.g. Alice)
- Target service SPN (e.g. CRM)
- User IP address
- Requested TGT Lifetime (usually ignored by AS)
```

### 2. KRB_AS_REP/Authentication Service Exchange (AS to Client)
![KRB_AS_REP Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_AS_REP_Diagram.png)
    
**AS Side:**

Upon receiving the user's unencrypted message, the AS validates the username against its own database of users and their secret keys. If valid, the AS creates 2 messages - The authenticator message and TGT.

The authenticator message is encrypted with the user’s secret key, taken from the user database. The TGT is encrypted with the TGS’s secret key which is generated in the initial Kerberos setup. This symmetric key is always stored on the KDC and not distributed for security reasons.

**Client Side:**

The Client receives the 2 messages and generates is own secret key by hashing its password, a salt and key version number (kvno) together.

Decryption of authenticator message here validates if users are legitimate. If failed, an invalid username or password was provided. The client can’t decrypt the TGT because it lacks the TGS secret key. 

The **client now has the TGS session key**.

### 3. KRB_TGS_REQ/Request Service Ticket (Client to TGS)

**Client Side:**
![KRB_TGS_REQ Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_TGS_REQ_Diagram_1.png)

The client generates 2 new messages. A plaintext message specifying the target service and an authenticator message storing its username and timestamp. Together with the encrypted TGT, these messages are sent to the TGS.

**TGS Side:**
![KRB_TGS_REQ Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_TGS_REQ_Diagram_2.png)

Upon receiving the 3 messages from the client:

1. The TGS checks if the target service name in the unencrypted message exists in its database of services. 
2. If yes, the TGS decrypts the encrypted TGT with its **own secret key** to retrieve the **underlying TGS session key**.
3. The TGS decrypts the User's authenticator message with the TGS session key to retrieve the requested service details.
4. The TGS ensures the username and timestamp in the TGT and User authenticator message match (approx. 2 min timestamp difference) It also checks if the TGT's user IP address matches the messages' source IP and the TGT isn't expired.
5. If all checks out, the TGS validates that the received authenticator message isn't already in its TGS cache. This provides replay-attack protection. If not existed, the authenticator message is stored in the TGS cache. Else, it gets rejected.

The TGS now replies the client with 2 messages.

### 4. KRB_TGS_REP/Service Ticket Generation and Distribution (TGS to Client)
![KRB_AP_REP Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_TGS_REP_Diagram.png)

**Target Service Server Side:**

The TGS generates a message storing the user details and the requested service ticket. Encrypted with the TGS session key and service secret Key respectively, they are sent to the client. Note the client and service secret keys are generated via similar means.

**Client Side:**

The client decrypts the service server's message with the previously retrieved TGS session key. With the underlying service session key, the client creates a new authenticator message and encrypts it with this service session key.

### 5. KRB_AP_REQ/Service Request (Client to Target Service Server)
![KRB_AP_REQ Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_AP_REQ_Diagram.png)
The client generates a new authenticator message and encrypts it with the received service session key. The service ticket remains encrypted as the client lacks the service’s secret key. These 2 messages are sent to the target service server.

### 6. KRB_AP_REP/Service Ticket Validation/Mutual Authentication (Service to Client)
![KRB_AP_REP Diagram](/assets/img/2024-10-19-How-Kerberos-Works-Part-2/KRB_AP_REP_Diagram_1.png)

**Target Server Side:**

With the encrypted service ticket and user's authenticator message, the Target server decrypts the service ticket with its own secret key to get the underlying service session key, which in turn decrypts the user's authenticator message. The Target server checks if the username in both messages match, the timestamps differ by 2 min maximum, the service ticket isn't expired and the User IP address matches the message source IP. 

If all checks out, the service checks its service cache for the received authenticator message. If it exists, the authenticator message is rejected. Else, it is cached.

Upon caching the user's authenticator message, the service encrypts its own authenticator message with the service session key and send it to the client.

**Client Side:**

The client decrypts the service's authenticator message with the previously received service session key from the KRB_AP_REQ phase. The timestamp underlying service name is validated against the intended service name. If valid, the service's authenticator is cached by the user for future use. Mutual authentication is now established between the client and service and both parties can communicate securely.

## Conclusion
Kerberos remains a cornerstone in network security, providing robust authentication mechanisms essential for protecting modern enterprise environments. By understanding its detailed workings of ticket-based authentication, we can better appreciate its beautiful complexity to ensure secure communication in the domain.