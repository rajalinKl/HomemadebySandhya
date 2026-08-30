const MenuPreview = createClass({
  render() {
    const entry = this.props.entry;
    const items = entry.getIn(['data', 'items']);
    
    if (!items) return h('div', { style: { padding: '40px', textAlign: 'center', color: '#888' } }, 'Loading live preview...');

    const itemsList = items.toJS();

    return h('div', { style: { fontFamily: 'Inter, sans-serif', padding: '30px', background: '#fcf8f5', minHeight: '100vh' } },
      // Header matching site theme
      h('div', { style: { textAlign: 'center', marginBottom: '30px' } },
        h('h2', { style: { color: '#2c1810', fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' } }, 'Live Menu Preview'),
        h('p', { style: { color: '#8c6d62', fontSize: '0.9rem' } }, 'Real-time rendering of your customer-facing menu layout')
      ),
      // Bento Grid container
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' } },
        itemsList.map((item, index) => {
          return h('div', { key: index, style: { background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(44, 24, 16, 0.06)', border: '1px solid rgba(226, 212, 204, 0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s' } },
            // Image Box
            h('div', { style: { height: '180px', background: '#f4ece6', position: 'relative', overflow: 'hidden' } },
              item.Image && item.Image.startsWith('http') 
                ? h('img', { src: item.Image, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                : h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2.5rem' } }, '🍱')
            ),
            // Content Body
            h('div', { style: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'space-between' } },
              h('div', {},
                String(item.IsWeekly).toUpperCase() === 'TRUE' && h('span', { style: { background: '#fdf2f2', color: '#d93838', fontSize: '0.7rem', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Weekly Special'),
                h('span', { style: { fontSize: '0.7rem', color: '#8c6d62', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '6px' } }, item.Category || 'Menu Item'),
                h('h3', { style: { fontSize: '1.15rem', fontWeight: '700', color: '#2c1810', margin: '0 0 8px 0', lineHeight: '1.3' } }, item.Name || 'Untitled Dish'),
                h('p', { style: { fontSize: '0.85rem', color: '#665147', margin: '0 0 20px 0', lineHeight: '1.5' } }, item.Description || 'No description provided.')
              ),
              // Card Footer / Price
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f4ece6', paddingTop: '14px', marginTop: 'auto' } },
                h('div', { style: { fontWeight: '800', color: '#2c1810', fontSize: '1.1rem' } }, `RM ${parseFloat(item.Price || 0).toFixed(2)}`),
                h('div', { style: { background: '#2c1810', color: '#ffffff', fontSize: '0.8rem', padding: '8px 16px', borderRadius: '12px', fontWeight: '600' } }, 'Select')
              )
            )
          );
        })
      )
    );
  }
});

CMS.registerPreviewTemplate("menu", MenuPreview);
