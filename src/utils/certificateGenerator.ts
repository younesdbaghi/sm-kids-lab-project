/**
 * High-Resolution Certificate Generator for Smart Kids Lab
 * Generates an official, beautiful landscape diploma (1600x1130 px)
 * that can be downloaded as PNG or printed directly.
 */

interface CertificateData {
  childName: string;
  level: number;
  xp: number;
  rankName: string;
  rankIcon: string;
  avatar: string;
}

export function generateCertificateCanvas(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1130;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context non disponible');

  const width = canvas.width;
  const height = canvas.height;

  // 1. Background (Parchment Ivory Gradient)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#fefdfa');
  bgGrad.addColorStop(0.5, '#ffffff');
  bgGrad.addColorStop(1, '#fbf8f1');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle background pattern / watermark
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#1e3a8a';
  for (let x = 80; x < width - 80; x += 120) {
    for (let y = 80; y < height - 80; y += 120) {
      ctx.font = '28px sans-serif';
      ctx.fillText('🚀', x, y);
    }
  }
  ctx.restore();

  // 2. Ornate Golden Outer Borders
  ctx.save();
  // Outer border
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#b45309'; // dark gold
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Middle gold accent
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fbbf24'; // bright gold
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Inner border
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#d97706';
  ctx.strokeRect(55, 55, width - 110, height - 110);

  // Corner decorations
  const corners = [
    [55, 55],
    [width - 55, 55],
    [55, height - 55],
    [width - 55, height - 55]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#fef3c7';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#b45309';
    ctx.fillText('★', cx, cy);
  });
  ctx.restore();

  // 3. Top Brand & Header
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Logo Icon & Text
  ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('SMART KIDS LAB', width / 2, 85);

  ctx.font = '600 16px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Apprendre · Créer · Explorer · Préparer demain', width / 2, 130);

  // Decorative Ribbon / Kicker
  ctx.save();
  const ribbonY = 170;
  const ribbonW = 540;
  const ribbonH = 40;
  const ribbonX = (width - ribbonW) / 2;

  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.roundRect(ribbonX, ribbonY, ribbonW, ribbonH, 10);
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  ctx.font = '800 15px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#b45309';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ CERTIFICAT D’APTITUDE & D’HONNEUR NUMÉRIQUE ★', width / 2, ribbonY + ribbonH / 2);
  ctx.restore();

  // 4. Main Title
  ctx.textBaseline = 'top';
  ctx.font = '900 46px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#1e3a8a'; // Royal Navy
  ctx.fillText('DIPLÔME DE L’EXPLORATEUR', width / 2, 235);

  // Subtitle
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('Ce diplôme officiel est décerné avec toutes les félicitations à :', width / 2, 310);

  // 5. Child's Name with Avatar
  const nameY = 360;
  // Avatar Circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2 - 240, nameY + 35, 45, 0, Math.PI * 2);
  ctx.fillStyle = '#eff6ff';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#3b82f6';
  ctx.stroke();

  ctx.font = '48px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(data.avatar || '🚀', width / 2 - 240, nameY + 37);
  ctx.restore();

  // Name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '900 54px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(data.childName, width / 2 + 20, nameY);

  // Elegant golden underline under the name
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, nameY + 70);
  ctx.lineTo(width / 2 + 220, nameY + 70);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  // Diamond accent in center of underline
  ctx.fillStyle = '#b45309';
  ctx.fillRect(width / 2 + 15, nameY + 67, 8, 8);
  ctx.restore();

  // 6. Commendation paragraph
  ctx.font = '500 20px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(
    'Pour avoir accompli avec succès et curiosité les épreuves d’initiation aux sciences',
    width / 2,
    465
  );
  ctx.fillText(
    'de la Logique, des Algorithmes, de la Programmation, de l’Intelligence Artificielle',
    width / 2,
    498
  );
  ctx.fillText(
    'et de la Créativité Numérique sur la plateforme interactive Smart Kids Lab.',
    width / 2,
    531
  );

  // 7. Stat Cards Grid (3 Columns)
  const cardY = 595;
  const cardW = 380;
  const cardH = 145;
  const cardGap = 40;
  const totalCardsW = 3 * cardW + 2 * cardGap;
  const startX = (width - totalCardsW) / 2;

  const stats = [
    {
      label: 'NIVEAU OFFICIEL',
      val: `NIVEAU ${data.level}`,
      sub: 'Progression continue',
      color: '#1d4ed8',
      bg: '#eff6ff',
      borderColor: '#93c5fd'
    },
    {
      label: 'RANG HONORIFIQUE',
      val: `${data.rankIcon} ${data.rankName}`,
      sub: 'Grade académique validé',
      color: '#b45309',
      bg: '#fef3c7',
      borderColor: '#fcd34d'
    },
    {
      label: 'POINTS D’EXPÉRIENCE',
      val: `${data.xp.toLocaleString('fr-FR')} XP`,
      sub: 'Connaissances et défis validés',
      color: '#047857',
      bg: '#ecfdf5',
      borderColor: '#a7f3d0'
    }
  ];

  stats.forEach((st, idx) => {
    const x = startX + idx * (cardW + cardGap);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, cardY, cardW, cardH, 16);
    ctx.fillStyle = st.bg;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = st.borderColor;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.font = '800 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(st.label, x + cardW / 2, cardY + 20);

    ctx.font = '900 28px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = st.color;
    ctx.fillText(st.val, x + cardW / 2, cardY + 50);

    ctx.font = '600 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(st.sub, x + cardW / 2, cardY + 100);
    ctx.restore();
  });

  // 8. Seal and Signatures (Footer)
  const footerY = 800;

  // Left: Date and Certification text
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = '600 15px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#64748b';
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  ctx.fillText('Délivré le : ' + currentDate, 120, footerY + 40);
  ctx.font = 'italic 14px Georgia, serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Certificat numérique authentique n° SKL-' + Math.abs(data.childName.split('').reduce((a, b) => a + b.charCodeAt(0), 1000) * 89).toString(), 120, footerY + 70);

  // Center: Official Gold Seal Medal
  ctx.save();
  const sealX = width / 2;
  const sealY = footerY + 80;

  // Seal outer glow/teeth
  ctx.beginPath();
  ctx.arc(sealX, sealY, 70, 0, Math.PI * 2);
  ctx.fillStyle = '#fef3c7';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  // Seal inner circle
  ctx.beginPath();
  ctx.arc(sealX, sealY, 56, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#d97706';
  ctx.stroke();

  ctx.font = '40px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🏆', sealX, sealY - 8);

  ctx.font = '900 10px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#b45309';
  ctx.fillText('EXCELLENCE', sealX, sealY + 28);
  ctx.fillText('★ 2026 ★', sealX, sealY + 40);
  ctx.restore();

  // Right: Pedagogical Signature
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Pour la Direction Pédagogique,', width - 120, footerY + 25);

  ctx.font = '900 22px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#1e3a8a';
  ctx.fillText('Smart Kids Lab Académie', width - 120, footerY + 55);

  // Simulated signature squiggle
  ctx.save();
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width - 320, footerY + 95);
  ctx.bezierCurveTo(width - 270, footerY + 75, width - 240, footerY + 115, width - 180, footerY + 85);
  ctx.bezierCurveTo(width - 150, footerY + 65, width - 130, footerY + 110, width - 90, footerY + 90);
  ctx.stroke();
  ctx.restore();

  // Bottom Legal line
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.font = '500 12px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Smart Kids Lab · Plateforme Éducative d’Éveil aux Sciences & Technologies du Futur · Tous droits réservés', width / 2, height - 60);

  return canvas;
}

/**
 * Downloads the certificate directly as a high-resolution PNG image file
 */
export async function downloadCertificateImage(data: CertificateData): Promise<void> {
  const canvas = generateCertificateCanvas(data);
  const dataUrl = canvas.toDataURL('image/png');

  const cleanName = data.childName.trim().toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'enfant';
  const fileName = `diplome_${cleanName}_smartkidslab.png`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Opens a print-friendly window or iframe with the generated certificate
 */
export async function printCertificateDirectly(data: CertificateData): Promise<boolean> {
  try {
    const canvas = generateCertificateCanvas(data);
    const dataUrl = canvas.toDataURL('image/png');

    // Create an invisible iframe to handle print safely without blocking popup
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';

    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow?.document;
    if (!frameDoc) {
      // Fallback: download
      await downloadCertificateImage(data);
      return false;
    }

    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Diplôme Smart Kids Lab - ${data.childName}</title>
          <style>
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
              display: block;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="Diplôme Smart Kids Lab" />
          <script>
            window.onload = function() {
              try {
                window.focus();
                window.print();
              } catch (e) {
                console.error(e);
              }
            };
          </script>
        </body>
      </html>
    `);
    frameDoc.close();

    // Remove frame after 10 seconds
    setTimeout(() => {
      if (document.body.contains(printFrame)) {
        document.body.removeChild(printFrame);
      }
    }, 10000);

    return true;
  } catch (err) {
    console.error('Erreur lors de l’impression, bascule sur téléchargement direct:', err);
    await downloadCertificateImage(data);
    return false;
  }
}
