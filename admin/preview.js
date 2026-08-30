const MenuPreview = createClass({
  render() {
    const entry = this.props.entry;
    const items = entry.getIn(['data', 'items']);
    
    if (!items) return h('div', {}, 'Loading preview...');

    const itemsList = items.toJS();

    return h('div', { style: { fontFamily: 'sans-serif', padding: '20px', background: '#fdfbfb', minHeight: '100vh' } },
      h('h2', { style: { color: '#2d3748', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' } }, 'Live Website Preview'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' } },
        itemsList.map((item, index) => {
          return h('div', { key: index, style: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
            // Image / Placeholder
            h('div', { style: { height: '160px', background: '#edf2f7', position: 'relative', overflow: 'hidden' } },
              item.Image && item.Image.startsWith('http') 
                ? h('img', { src: item.Image, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                : h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem' } }, '🍽️')
            ),
            // Content
            h('div', { style: { padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'space-between' } },
              h('div', {},
                item.IsWeekly === 'TRUE' && h('span', { style: { background: '#fff5f7', color: '#e53e3e', fontSize: '0.75rem', fontWeight: '700', padding: '4px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' } }, 'Weekly Special'),
                h('span', { style: { fontSize: '0.75rem', color: '#718096', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' } }, item.Category),
                h('h4', { style: { fontSize: '1rem', fontWeight: '700', color: '#1a202c', margin: '0 0 6px 0' } }, item.Name || 'Untitled Dish'),
                h('p', { style: { fontSize: '0.85rem', color: '#4a5568', margin: '0 0 16px 0', lineHeight: '1.4' } }, item.Description)
              ),
              // Footer / Price
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'between', borderTop: '1px solid #edf2f7', paddingTop: '12px', marginTop: 'auto' } },
                h('span', { style: { fontWeight: '700', color: '#2d3748', fontSize: '1.1rem', flexGrow: '1' } }, `RM ${parseFloat(item.Price || 0).toFixed(2)}`),
                h('span', { style: { background: '#1a202c', color: '#fff', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '8px', fontWeight: '600' } }, 'Select')
              )
            )
          );
        })
      )
    );
  }
});

CMS.registerPreviewTemplate("menu", MenuPreview);
