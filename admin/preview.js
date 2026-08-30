CMS.registerPreviewTemplate("menu", createClass({
  render() {
    const entry = this.props.entry;
    const data = entry.get('data');
    
    if (!data) return h('div', { style: { padding: '30px', textAlign: 'center' } }, 'Loading preview...');

    // Handle both Map/List structures from Decap CMS
    const items = data.get('items');
    const itemsList = items ? items.toJS() : [];

    return h('div', { style: { fontFamily: 'sans-serif', padding: '24px', background: '#faf5f0', minHeight: '100vh' } },
      h('div', { style: { textAlign: 'center', marginBottom: '24px' } },
        h('h2', { style: { color: '#2c1810', fontSize: '1.5rem', fontWeight: '800' } }, 'Live Menu Preview'),
        h('p', { style: { color: '#7a5c50', fontSize: '0.85rem' } }, `${itemsList.length} items loaded`)
      ),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' } },
        itemsList.map((item, index) => {
          return h('div', { key: index, style: { background: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e6d7cd', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' } },
            h('div', { style: { height: '140px', background: '#f4ede6', overflow: 'hidden' } },
              item.Image && item.Image.startsWith('http') 
                ? h('img', { src: item.Image, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                : h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem' } }, '🍱')
            ),
            h('div', { style: { padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'space-between' } },
              h('div', {},
                String(item.IsWeekly).toUpperCase() === 'TRUE' && h('span', { style: { background: '#fdf2f2', color: '#c53030', fontSize: '0.65rem', fontWeight: '700', padding: '3px 8px', borderRadius: '10px', display: 'inline-block', marginBottom: '8px' } }, 'WEEKLY SPECIAL'),
                h('span', { style: { fontSize: '0.65rem', color: '#8c6d62', display: 'block', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' } }, item.Category || 'Item'),
                h('h4', { style: { fontSize: '1rem', fontWeight: '700', color: '#2c1810', margin: '0 0 6px 0' } }, item.Name || 'Untitled'),
                h('p', { style: { fontSize: '0.8rem', color: '#594137', margin: '0 0 14px 0', lineHeight: '1.4' } }, item.Description || '')
              ),
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f4ede6', paddingTop: '10px' } },
                h('span', { style: { fontWeight: '700', color: '#2c1810', fontSize: '1rem' } }, `RM ${parseFloat(item.Price || 0).toFixed(2)}`),
                h('span', { style: { background: '#2c1810', color: '#fff', fontSize: '0.75rem', padding: '5px 10px', borderRadius: '8px', fontWeight: '600' } }, 'Select')
              )
            )
          );
        })
      )
    );
  }
}));
