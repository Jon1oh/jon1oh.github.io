---
title: How Kerberos Works (Part 1)
date: 2024-10-05 15:55 +0800
tags: [Kerberos, AD]
categories: Research
image: /assets/img/2024-10-05-How-Kerberos-Works-Part-1/Cerberus.jpeg
alt: "Kerberos"
---

## Introduction

Authentication is a critical part of keeping networks secure. Kerberos, a protocol that's been around since the 1980s, is still a key player in today’s enterprise environments. Though an old technology, it’s far from obsolete. It is known for its complexity in Active Directory environments to ensure secure authentication of users.

As such, I'll **split this topic into 2**. Today, I'll discuss how Kerberos works on a high-level and explore the steps behind this powerful protocol.

### Background

Kerberos is a network authentication protocol that provides secure authentication between clients and services over a network. It ensures passwords and encryption keys are never directly exchanged between identities and used by organizations for Single Sign-On (SSO) capabilities. This mutual authentication allows both clients and services to communicate securely. Kerberos’s name comes from Cerberus, the 3-headed dog from Greek mythology, guarding the gates to underworld of Hades.

## Terminologies

Before diving into the belly of the beast, let’s understand some key terminologies first.

1. **Kerberos Realm:** The domain that Kerberos operates in.
2. **Principals**: Unique identities in the realm (i.e. Users, Clients, Services)
3. **Tickets:** Used for authenticating users and services without sending passwords in the network. Such tickets include the Ticket Granting Ticket (TGT) and service ticket.
4. **Key Distribution Center (KDC):** The heart of Kerberos, which includes the Authentication Server and Ticket Granting Server. They all reside on the DC.
5. **Authentication Server (AS):** The server that confirms a request is made by a known user and distributes Ticket Granting Tickets (TGT) to them.
6. **Ticket Granting Server (TGS):** The server that confirms a user is making a request to a known service and distributes service tickets.
7. **Messages:** These are the data exchanged between the user, service, and KDC, to facilitate the Kerberos Authentication process and ensure secure communications throughout. Without messages, no authentication can occur.

    There's 2 types of messages worth highlighting:

    i. **Authenticator**: Stores user-specific information for mutual authentication between the user and target service server to occur.

    ii. **Tickets**: Contains most of the information to be passed between the client and servers (i.e. Client’s identity, service ID, timestamps, session keys, etc.)

As implied by Cerberus, Kerberos involves 3 entities. The requesting client/user, the target service server, and the KDC. Other important entities include the AS and TGS.

## How Kerberos Works
![Kerberos Authentication Diagram](/assets/img/2024-10-05-How-Kerberos-Works-Part-1/kerberos_diagram.png)

1. **KRB_AS_REQ/Request TGT (Client to AS):**
    
    > “Hey Authentication Server, I want to access a service.”
    
    The user sends an unencrypted message to the AS, requesting to access a service.
    
2. **KRB_AS_REP/Ticket Granting Ticket (TGT) Generation and Distribution (AS to Client):**
    
    > “Ok, I’ve checked you’re a valid user. Here’s the encrypted TGT.”
    
    The AS receives the message and validates it came from a valid user. If valid, the AS generates and sends the user a TGT unique to him/her, encrypted with the user’s secret key/password hash. A random salt and key version number (kvno) are appended to the *plaintext* password before generating the hash.
    
3. **KRB_TGS_REQ/Request Service Ticket (Client to TGS):**
    
    > “Hey TGS, here’s my authenticator message and encrypted TGT. Please give me the service ticket to access a service.”
    
    The user receives his/her TGT from the AS, generates some authenticator messages and sends them with the TGT to the TGS.
    
4. **KRB_TGS_REP/Service Ticket Generation and Distribution (TGS to Client):**
    
    > “Hey client, your TGT is valid and it came from you. Here’s your requested service ticket.”
    
    The TGS validates the TGT came from the user whom the TGT was previously issued to. If yes, the TGS generates a service ticket for the requested service, encrypts it with the target service’s secret key, and sends it to the client.
    
5. **KRB_AP_REQ/Request Service(Client to Service):**
    
    > “Hey target service, here’s my authenticator message and the encrypted service ticket. I want to access your service.” 
    
    The client creates an authenticator message and sends it with the encrypted service ticket to the target service’s server.
    
6. **KRB_AP_REP/Service Ticket Validation/Mutual Authentication (Service to Client):**
    
    > “Hey client, your service ticket is valid and it came from you. You can now use my service over a secure channel.”
    
    The service decrypts the service ticket using its secret key (i.e. service account's *plaintext* password, random salt, and a kvno) and validates the ticket came from the intended user. If yes, the service generates its own authenticator message and sends it to the client. Thus, establishing a secure communication channel between both parties.
    
This ensures that mutual authentication is established between the client/user and target service and both entities can communicate securely.

## Conclusion

Kerberos is a network authentication protocol that ensures secure authentication between clients and servers using secret-key cryptography. It is facilitated by several entities over a ticket-based communication in the domain, intending to establish mutual authentication between clients and servers for secure communication. In part 2, we’ll dig deeper into how Kerberos works.

## References
1.  [Kerberos Authentication Explained | A deep dive (Destination Certification)](https://www.youtube.com/watch?v=5N242XcKAsM)
<br>
2.  [Understanding Kerberos (risk3sixty)](https://www.youtube.com/watch?v=1qGhMAFKlOw)