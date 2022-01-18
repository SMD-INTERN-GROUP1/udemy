const seed = require('seed')
//const faker = require('faker');
const Course = require('../models/Courses');
console.log('This is seed: ',seed);
console.log('This is faker: ', faker);
console.log('Course seed start...');

Course.find({}, function(err, courses) {
    if(!err) console.log('This is list_course: ', courses);
    else console.log('This is err: ',err);
})
console.log('Course seed end...');
// let courses = [];
// for(i = 0; i < 20; i++) {
//     courses.push({
//         image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYgAAACBCAMAAADt5d1oAAAA/1BMVEX33x0AAAD23x353h0AAAOknjn54xfZ0D/54Rb33iAAAgD43xz24BoAAAUDAAD13yDz4R363CP96Dj86S8ZFwC7tDn55RnDujrx5Bj+5yj55Tv04jzt3Tjk1zXQyjfUyTzNyjru4Cj/8Drs2kKRixxsZRhLRBo6NRg0LxYrJxFOSRpxaxbCui787UZZVRgQCQgTDACdlSouKwGLhC2akzpjXB5vZyhZWCf78TaCey+uozOUjCpHQgpZUxA8OAAzMQJPTxaqnC7m3kPNxE28rTWShh0NEwuEeyl7djV+eRu1sjIiIQvYxDHs2i0lGwTo40Hi105FQiOTijT36lXt4FVbJ16QAAAMMElEQVR4nO2dj1vTSBPHk93YZjvTZtOFlJZizyL+AIuAgvzQw/N8z1PvXj29//9veWc2bdpCG8D2eVDf+TwIbZr4wH6zM7O7s5MgEK4DGgwCc9u/hSBCfC+IEN8JIsR3ggjxnSBCfCeIEIIgCIIgCIIgCIIgCIIgCILw/4ABazSiDpQnSUAbg+rCSXQkSRTya6QPtdYBX5AYwx/exu/906EBdapQD1GK2tXApbZFSFNqfWP4pCRJWAud8jeRYTmAUaBZj+FbCCBGk144i9ocwJiEekFAp2NCL4HACnLnEJaASsjYJPmtzjc5Gu4WF06i94DW0gkQA32PSRUisRgYEWIpULMGWIkrI+yaSo3F6ZOShHUKMG43O+vdbnd9vekyUiTV4iCWBWjcuHu3d7fgl3s6sBdOwkwZXelvPrm/9eDho8ePHj7c3rn/ZLOfQUpe/lZ+758OE6zdCaeokt25YG5Ax+3B6u7T6ROf7n4YZCA+YjmAzkiIaEqIAIvGpWYGA7q9vr/Hn43Oi4YvGvuDjIMpMlK3+Uf8FEDlUo8watSs5MMpmAXXWgnrYSOcwUHLgQ+CxVksSKkQmFC0FHSehVEtbDTqF0SI/NfzZkI62ABu9c/48SkXQhmofDokHWq1y72hHoURiXPUR0zEVSxKqRBk/fXgBZklbvFohhYsRnh4TEGVmKYFKRUiDcAdhTVWIb/7pyBzFfkfJ07LCHtRyoWoZKd5jBRFUeOit468/66TPqdrPDkiLEKpEEp3qSNEo3A1mhRh/IOUqGotA7vFKBXCuhN2A6OuUK+Fdf+64c1UND68O1BimhajvEds5K5g7BaivHvUG42IxWBz5U3WBxQhFqNUiPYZNflEsMRN//LVq1+5U9TZPbAopMPBqkPxEYtRKoR74OPTMedvNzvONTdPz8kw1erUQ/jos26mJWpakFIhNmr1aNJHnwwqMQapjrPBGdss/grPq8exX78TFqFMCFz1g4di/LDdD7RKgP6l2p3SCI8t034n44VUldzu3/HDM18IxS6iMTmM62WgwfASkTKV/hkf2q06NDzlJ+OIBZkthFGKbnz3LowafgxBclAU21QI+VyGMqg6r8OnvzWtbAtdDnOF0IBuh4QIh0JE4fkxUlcY+QLA3tGbNiTSE5bDHCECNAbdFh/IuwR75WNLQhQZH9o41MZoUWIpzBaCb3ujqEeEE1HTXt8YE6hRyytrgzSxEi4th3lCILU0+YixENQx/kKt2TrlVyqLGFhZiVgSc4WgSKi978fNuRA0ojg8tqzQUAhOsYE87VJYnDnhK934dPevhvmSw4jn/Ym1aeA0WQAs+c+F6zNfCNBB1feICS3eD3LrBJx4aa2lXiG+ejmUTnHcO+AjhRC1KDz4vc95T5oC3IBGFZyqeau//s9D+aQfjeii8TR4nVcjXrc6bUyov/D8EsjMxrIoFSLucfMXQkSR7xwvT7suZuPEWcjiq5dEqRC6vx1OTITziwa//fis6lBRv1ABpKLEUihPp4HeOL+SHXfEsvjpp6MnzlsnmexbElckD7gjav7RGl3Ea3LFSHv7bZ+iJiNJA8uhVAjyyfdWxh/V8vSmIqXjgKTg4Z0ETkug3DTZQFfZOM3KuGQetY5j3kcHkum3KKVCQKCg3aKu4HW4mOnnkzCPqm20oJV0iwUpj5q0tkG71eDQKbokBHcUOro/QCObfBemfH9Emlqr2r1HnF55eX8E9QjuFIebCKDEaS9GeVo+gklQ46ct8tH1S37C58TS94fVCkgYuyDl4au1OtVJEru3K9MbvLzPYBGieqMe7n1ui4tYkPJscGPjFNCknMi0N6NDeE9BXWXvjRUlFqPcWYNCA7ylUaHb/M8fYVhk4k96jKgR/rqu6bRENqx8M+XjiBE87524jbNHnNDR4KFdfSoXsxa+c0BCSHb+N3MtIbggjUmStL3+YXvkICadBU+CVDEd1/QQbsz1hQiSVEO7effPC0JEHFDVwt0+8P4tcRXfyDWF8A2seJepcutfvKcu9qlEeZJ+r0KWSfZbfyvX8xE5GhF5aql9b/9xGE4OK3hX0XtHQlwu9SRcj2sJAcUPjEHREK89OCvCphqPuWlg93gAgdGS1HENwPjx75RDNdNCRNNTHAEqX73JZ7wCp8Qaw/MZRrsqu+1G5PebRn7xqBcnIsR1IKOiQXOaDBZZYoHJ7kyOCepeiJFUNJhDm3DhMi6nNToKfnsQru+yEOP1u/BDZrSkwl6JMQq5WJlCallj5ghxcfbV0JdVmjMrk2KIkNcGwk8fw6l5j/s0lJCCZteAjHtgQON0vmp2yUeMywRholO6gvcIkR++kDmj26e8Zje+cschJCLElSjyEbzaz3X4dFEtboaznhCC7JjJ3F8dMDYuZi+Un/Im+7Q5mVkQhodN6nAixFVwMiuZGfe3ZcuSFLf3ZSGwEILa3riNd+F+W61NbqRmJUjRzn+jySB2t4mB7Hu/EqR+gGufTl4eQ2rGdSzNJSFg3JoJxut3OHvgsyXnMq2ERugchNNCBCBCXI3Sqn9KrXqacenjIkLNtwUV/PEGxmkZ0G8deH/8eECdqYiavBDUr9ajKSEOmxRbiRBzwUBTvKRT6Fcf8BT2QddaLjpGkRNS4D8YVpnxROE/62BTciaxpbHCG4pQ81ml3QFngZuEAl8IuPooOfFKa1LBBjnrQIQoQfu6rcZ1T/ymxFp41E+1H3oZrpvYCqPxFt5a+KIJXPkVANvdd3ykXudl0nD7k/WVd33usalkVmH/pf+scNf32+ZSgUxhTIrUhNA/9Td8xFWwnjvN9aTp7tbB8etoKvR578C3ZjI4fTpMKWv4+jTn1WaCXM6Sr6NhCPbfUWepT0yHtyoGpUfMxyDG7d4LnpnjUgF8Bz8/roCvP50NnvGB2liJVevXd7Tb9W9HKZb873nXVQC44iIJ6zb/DH06TUG9CilJJSPredBQ4O/3UzlJUfj6yUbTNTvd1q6fz64V9iXiDYtWG7O2zyXkotFmRjZC4eP3TzY6TaZ79/1KnpE8ZnugJc+sDLr3eZuDz0vyXtnvN/m4vfXqwUfvi30jD3nQQW2Q49bBwVC0/HYfvlp5sLWzs/X6cTjpWXJ+ywKZBS+DDI07HBuY4cpm4Z4btUkfQUM3SEg61PHn4fHhtyjyjrvoVZHftzKhYTejcCuVNeu5mEDH1bzx6hM3uW9laslolMTH80aNTVtBA2TslXb7YVRUzWoU6WRjQXOzladiNsIvbZUYkOSB+aQ0iHBnIwMzl3qtVg/PnPUhkU6sDvo7eXXLkotGitbClYF46SugQMdi5/XwFp6nhXcce4PMP9uGn5mSarvOtXcbUzutZwnht3OtZiLEFZCPsAo22DGTDZojRL5PsZXx1CxPYXBVgSDuvvDVd6+C+sQXF9/23/ndw2G/wTXecFJrRHNu7xqPJWigZ/JsYr/8QIOz/lE4nSUw61K68qQv+62vhOe/jY1hc8+P3Wa3Zp1ac8uByR9oxvvY0U9INb+Ue5bQp9I8O5baKFcDir74aXODF/PvbnIQZ33w1YHMsJwAyQCBaff+uUqJ8LTPYw/hCrTxz/BDgMFZzY/MZpmnlVUXjJayNedrQJpytT6s9Pc/+jN83HrxUnq/+8anvUoJgutCreuqO2E+f5RPTkTeVHH4edJdSy9kEBdRULt755xPZlefX1fz3t0P73ZbTQmXbgQ/bCNFV312nkuQ39s+Nj0/qzpLnoTu/1lXmsDde7t1kHeAmtdwONt3/q7nRIYbw8s5GtrrvTsTi3K1rTu9ToaGVxnm+VuFEPNlJwcTRung5LTXaccyu3RjeLdJoshfxBU3+Fr9pdVq9T5/HbiYHxHEwwYTzNlmwtWAADBzza//9lqrq6ut3r9fmy7j2RCpRX1j+Am8+dNhjX/MaJZlvDLEWXw6BaU4zJ1tZwxXKqPeRL3GX5ZllThfqTNGUspuDC/IeeOE1vr9Doh5Yg0/NVn5KaZ59h7R+iQQa5E3mvKl/ATf1CRWJvluDOfMc1Yxi2AUN7rxoZSvL8Amxpe2nI1JU+/teTs1h7iK8/+4ohzITvcbw7N5RnkhwD9hdKoNyfjMb1I2QQFXqS66jH/YLP9XUpBaEARBEARBEARBEARBEARBEARBEARBEARBEARB+AH5H7ikvi+bJqYnAAAAAElFTkSuQmCC",
//         title: faker.commerce.productName(),
//         author: faker.internet.userName(),
//         description: faker.lorem.text(),
//         start: 1,
//         price: 99,
//         isDiscount: true,
//         email: faker.internet.email()
//     })
// }

// let data = [{
//     'model': 'Courses',
//     'documents': courses
// }]

// seeder.connect(process.env.MONGODB, function() {
//     seeder.loadModels([
//       '../models/Courses'  // load mongoose model 
//     ]);
//     seeder.clearModels(['Category'], function() {
//       seeder.populateModels(data, function() {
//         seeder.disconnect();
//       });
//     });
//   });