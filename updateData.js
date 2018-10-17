let url = 'http://localhost:3004/0'
let content = []


let cats = (function getCategories(){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(data){
			data.map((entry, key) => {
				$('#mySelect').append($(document.createElement("option")).attr('value',entry.title).text(entry.title));
		})
		},
		error: function(request, error){
			alert("Nope. " +JSON.stringify(request));
		}
	})
}());

function displayData(data){
	let category = $('#mySelect').val()
	data.map(entry => {
				if(entry.title === category){
					content = entry;
					entry.links.map((detail, index) => {
						let adjust = 'i'+index;
						$('#catDisplay').append($(document.createElement('form')).attr('id', adjust));
						let newId = '#i' + index;
						$(newId).append($(document.createElement('p')).attr('id', entry.id).attr('type','hidden'));
						$(newId).append($(document.createElement("label")).text("Label: "));
						$(newId).append($(document.createElement("input")).attr('value', detail.label));
						$(newId).append($(document.createElement("label")).text("URL: "));
						$(newId).append($(document.createElement("input")).attr('value', detail.href));
						$(newId).append($(document.createElement('button'))
							.attr('type', 'submit').text('Update'));
						$(newId).append($(document.createElement('p')));
					})
				}
			})
}

function getData(){
	$('#catDisplay').empty()
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(data){
			displayData(data)
		},
		error: function(request, error){
			alert("Nope. " +JSON.stringify(request));
		}
	})
}

function template(linkId, label, href, entryId='', entryData=[]){
	let stringId = linkId.toString()
	let linky = {"id": stringId,"label": label, "href": href}
	if(entryId===''){
		return linky
	}
	if(entryId !== ''){
		entryData.links.push(linky)
		updateLinks(entryId, fromPost=true)
		return postData(entryData, entryId)
	}
}

function mainTemplate(title, linkId, label, href){
	let newStringId = linkId.toString()
	let format = {
		"id": linkId,
		"title": title,
		"links": [template("0", label, href)]
	}
	return postData(format)
}

function getLength(title, label, href, entryId='', entryData=[], temp=false, mainTemp=false){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(data){
			data.map((entry, index) => {
				if(entry.title === title && temp){
					 template(entry.links.length, label, href, entryId, entryData)
				}
				if(entry.title !== title && index === data.length-1 && mainTemp){
					return mainTemplate(title, data.length, label, href)
				}
			})
		},
		error: function(request, error){
			alert("Nope. " +JSON.stringify(request));
		}
	});
};

function postData(data, entryId=''){
	let json_data = JSON.stringify(data);
	$.ajax({
		url: url,
		type: "POST",
		dataType: 'json',
		data: json_data,
		contentType: "application/json;charset=utf-8",
		success: function(data){
			alert("Link Updated.")
			console.log(data)
		},
		error: function(request, error){
			alert("Nope. Here's the error: " + error + " and here's the request " + JSON.stringify(request));
		}
	})
}


function updateLinks(linkId, fromPost=false){
		let preciseURL = url+'/'+linkId
		$.ajax({
		url: preciseURL,
		type: 'DELETE',
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data){
			if(fromPost===false){
				postData(content)
			}
		},
		error: function(request, error){
			alert("Nope. Here's the error: " + error + " and here's the request " + JSON.stringify(request));
		}
	})
}


$("#catDisplay").submit(function(e){
	e.preventDefault();
	let eId = e.target.id.slice(1,)
	content.links.map(linky => {
		if(linky.id === eId){
			if(linky.href !== e.target[1].value){
				linky.href = e.target[1].value
			}
			if(linky.label !== e.target[0].value){
				linky.label = e.target[0].value
			}
			if(e.target[0].value === ''){
				let filteredLinks = content.links.filter(item => item.id !== linky.id)
				let finalize = filteredLinks.map((linky, index) => {
					linky.id = index.toString
					return (linky)
				})
				content.links = finalize
			}
		}
		})
	updateLinks(e.target.children[0].id)
})

$("#addInfo").submit(function(e){
	e.preventDefault();
	let category = e.target[0].value
	let label = e.target[1].value
	let href = e.target[2].value
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(data){
			data.map((entry, index) => {
				if(entry.title === category){
					return getLength(category, label, href, entryLength=entry.id, entryData=entry, temp=true, mainTemp=false)
				}
				if(entry.title !== category && index === data.length-1){
					return getLength(category, label, href, entryLength=entry.id, entryData=entry, temp=false, mainTemp=true)
				}
			})
			e.target[0].value = ''
			e.target[1].value = ''
			e.target[2].value = ''
		}
})
})








