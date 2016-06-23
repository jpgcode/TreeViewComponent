export default function TreeData(){
    return {
        title: 'Main Parent node',
        childs: [
            {
                title: 'Parent Node Level 1',
                childs: [
                    {
                        title: 'Parent Node Level 2',
                        childs: [
                            {
                                title: 'Child Node',
                                childs: [

                                ]
                            },
                            {
                                title: 'Child Node'
                            },
                            {
                                title: 'Leaf Node'
                            }
                        ]
                    }
                ]
            }, {
                title: 'Leaf Node Label 1'
            }
        ]
    };
}
