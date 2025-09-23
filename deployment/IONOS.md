# Deploying to IONOS

IONOS supports two main approaches that work with this project: static hosting on a Webspace package or running a Node.js app. Pick the option that matches your subscription.

## Option A: Static Webspace (most common)

1. **Build locally**
   ```bash
   npm run build
   ```
   This emits `dist/` plus keeps data + images in `public/`.
2. **Stage upload assets**
   Copy the following to a temporary folder for transfer:
   - Everything inside `dist/`
   - `public/data/` (menu + hero JSON)
   - `public/images/` and `public/uploads/`
3. **Connect to IONOS SFTP**
   - Host: `homeX.1and1-data.host` (replace `X` with the number shown in the control panel)
   - Username/password: from *Hosting > SFTP & SSH*
   - Remote path: `/htdocs` (or whichever subdirectory the domain maps to)
4. **Upload**
   - Place the contents of `dist/` directly inside `/htdocs`
   - Mirror the `public/data` and `public/images` folders alongside the build assets:
     ```
     /htdocs/
       index.html
       assets/
       data/
       images/
       uploads/
     ```
5. **Set cache headers (optional but recommended)**
   - Create `.htaccess` in `/htdocs` with:
     ```apache
     <IfModule mod_headers.c>
       <FilesMatch "\.(json)$">
         Header set Cache-Control "max-age=600"
       </FilesMatch>
       <FilesMatch "\.(js|css|png|jpg|jpeg|svg|webp)$">
         Header set Cache-Control "max-age=31536000, immutable"
       </FilesMatch>
     </IfModule>
     ```
6. **Smoke test**
   Visit the domain, confirm images load, and check `/data/menu.json` is reachable directly in the browser.

### Automating the upload (optional)

Add this script to `package.json` if you want a single command deployment (requires `lftp` or similar on your machine):

```json
"scripts": {
  "deploy:ionos": "npm run build && node scripts/push-ionos.js"
}
```

Then create `scripts/push-ionos.js` to SFTP-sync the folders using environment variables for credentials. Keep credentials out of source control and load them from `.env.local`.

## Option B: Managed Node.js App

If your IONOS plan includes *Managed Node.js Hosting*:

1. Push this repo to a remote (GitHub/GitLab).
2. In the IONOS panel, create a new Node.js project and connect the repository.
3. Set the build command to `npm run build` and the start command to `npm start`.
4. Set the build directory to `dist` and enable static file serving.
5. Add environment variables if you later introduce API keys (currently none are required).
6. Trigger a deployment from the dashboard.

IONOS will run `npm install --production`, build, and start `vite preview --host`, which serves the generated static bundle over the configured port.

## Troubleshooting Checklist

- **Blank page?** Confirm `assets/index-*.js` is uploaded and MIME type is `application/javascript`.
- **Missing images?** Make sure the `images/` folder sits alongside `index.html` in `/htdocs`.
- **Stale menu data?** Re-upload `data/menu.json` whenever you update menu items, or cache may continue serving the old file until it expires.
- **SSL redirect loop?** Use the IONOS control panel to enforce HTTPS rather than an `.htaccess` redirect when using the preview server.

## Suggested Workflow

1. `npm run dev` locally during content edits.
2. `npm run lint && npm run build` before deployment to catch regressions.
3. Use the FTP upload (or scripted sync) to deliver `dist/`, `data/`, and `images/` to IONOS.
4. Record the deployment in your change log and keep a dated backup of the uploaded bundle.
