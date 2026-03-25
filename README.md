# Mamie Paule

Site vitrine minimaliste en français pour une peintre âgée, construit avec Next.js App Router, Tailwind CSS et Supabase.

## Aperçu

- Page publique très simple avec galerie d'œuvres
- Page `/admin` protégée par lien magique Supabase
- Upload d'image vers Supabase Storage
- Enregistrement en base Postgres des champs `image_url`, `description`, `created_at`
- QR code de la page d'accueil
- Bouton `Partager` qui copie l'URL du site

## Stack

- Next.js 15
- React 19
- Tailwind CSS
- Supabase Auth
- Supabase Storage
- Supabase Postgres

## Installation

1. Installer les dépendances :

```bash
npm install
```

2. Copier le fichier d'environnement :

```bash
cp .env.example .env.local
```

3. Renseigner les variables Supabase dans `.env.local`.

4. Exécuter le schéma SQL dans Supabase :

- Ouvrez le dashboard Supabase
- Allez dans `SQL Editor`
- Copiez le contenu de [supabase/schema.sql](/Users/simonwacziarg/MamiePauleWebsite/supabase/schema.sql)
- Exécutez la requête

5. Vérifier la configuration Auth dans Supabase :

- `Authentication` → `Providers` → activer `Email`
- laisser la connexion par lien magique active
- `Authentication` → `URL Configuration`
- ajouter `http://localhost:3000/auth/confirm` pour le développement
- ajouter aussi votre URL de production, par exemple `https://votre-domaine.fr/auth/confirm`

6. Lancer le serveur local :

```bash
npm run dev
```

7. Ouvrir :

- Galerie publique : `http://localhost:3000`
- Administration : `http://localhost:3000/admin`

## Variables d'environnement

Le projet utilise les variables suivantes, documentées dans [.env.example](/Users/simonwacziarg/MamiePauleWebsite/.env.example) :

- `NEXT_PUBLIC_SUPABASE_URL`
  URL publique du projet Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  Clé publique anonyme Supabase utilisée côté client et côté serveur.
- `NEXT_PUBLIC_SITE_URL`
  URL publique du site. Sert au QR code, au bouton de partage et à la redirection e-mail.

## Schéma SQL

Le schéma complet est fourni dans [supabase/schema.sql](/Users/simonwacziarg/MamiePauleWebsite/supabase/schema.sql).

Il crée :

- la table `public.artworks`
- les policies RLS pour lecture publique
- les permissions d'insertion/modification/suppression pour utilisateurs authentifiés
- le bucket Storage public `artworks`
- les policies Storage associées

## Structure du projet

- [app/page.tsx](/Users/simonwacziarg/MamiePauleWebsite/app/page.tsx)
  galerie publique
- [app/admin/page.tsx](/Users/simonwacziarg/MamiePauleWebsite/app/admin/page.tsx)
  page d'administration
- [app/auth/confirm/route.ts](/Users/simonwacziarg/MamiePauleWebsite/app/auth/confirm/route.ts)
  validation du lien magique
- [app/api/qr/route.ts](/Users/simonwacziarg/MamiePauleWebsite/app/api/qr/route.ts)
  génération du QR code
- [components/artwork-upload-form.tsx](/Users/simonwacziarg/MamiePauleWebsite/components/artwork-upload-form.tsx)
  formulaire d'upload
- [components/admin-auth.tsx](/Users/simonwacziarg/MamiePauleWebsite/components/admin-auth.tsx)
  formulaire de connexion e-mail
- [lib/supabase/server.ts](/Users/simonwacziarg/MamiePauleWebsite/lib/supabase/server.ts)
  client Supabase serveur
- [lib/supabase/client.ts](/Users/simonwacziarg/MamiePauleWebsite/lib/supabase/client.ts)
  client Supabase navigateur
- [middleware.ts](/Users/simonwacziarg/MamiePauleWebsite/middleware.ts)
  synchronisation de session Auth

## Déploiement

Pour Vercel ou une autre plateforme :

1. Définir les 3 variables d'environnement.
2. Ajouter l'URL de production dans `Authentication` → `URL Configuration` sur Supabase.
3. Vérifier que `NEXT_PUBLIC_SITE_URL` pointe vers l'URL publique finale.
4. Déployer.

## Vérification locale

Build de production validé avec :

```bash
npm run build
```
