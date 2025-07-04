# Favicon Update Instructions

We've already updated the logo SVG file to match the new red and black color scheme, but the browser tab icon (favicon) also needs to be updated.

## Option 1: Use an Online Converter

1. Go to any of these online converters:
   - https://realfavicongenerator.net/ (Recommended - creates multiple sizes and formats)
   - https://favicon.io/favicon-converter/
   - https://convertico.com/svg-to-ico/
   - https://picflow.com/convert/svg-to-ico

2. Upload the `public/logo.svg` file 

3. Download the generated favicon.ico file

4. Replace the existing `public/favicon.ico` file with the new one

## Option 2: Use the Favicon Generator HTML

We've created a simple HTML file that generates a preview of the new favicon:

1. Open the `favicon-generator.html` file in your browser
2. Right-click on the canvas and select "Save image as..."
3. Save it as "favicon.png" in the public folder
4. Use one of the online converters mentioned above to convert the PNG to ICO format
5. Replace the existing `public/favicon.ico` file with the new one

## Option 3: Use direct SVG favicon

Modern browsers support SVG favicons directly. The website is already configured to use the SVG favicon with this line in index.html:

```html
<link rel="icon" type="image/svg+xml" href="/logo.svg" />
```

So if you've updated the `public/logo.svg` file, modern browsers will show the updated favicon. However, some older browsers may still look for favicon.ico, so it's good to update both.

## Open Graph and Twitter Card Images

For completeness, consider also updating these images referenced in index.html:
- `og-image.png` - Used for Facebook/Open Graph sharing
- Twitter card image 