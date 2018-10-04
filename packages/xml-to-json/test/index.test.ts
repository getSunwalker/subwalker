import xmlToJSON from '../src/index';
test('xml-to-json', () => {
    const json = xmlToJSON(`
        <template>
            <div id="box">
                <button type="button">submit</button>
            </div>
        </template>
    `);
    const template = (json.children || []).find((item) => item.tag === 'template');
    console.log(json);
    console.log(`template=`, template);
    expect(template && template.tag === 'template').toBe(true);
});
