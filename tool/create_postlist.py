import json
import glob
from json import decoder

post_list_dic=dict()
postlists=glob.glob("./post/*.md")
id=1
for post in postlists:
    name_, class_, tag_, time_ = post.split("_")
    url_ = name_
    name_= name_.replace("./post/",'')
    time_= time_.replace(".md","")
    _tmp = dict()
    _tmp["name"] = name_
    _tmp["class"] = class_
    _tmp["tag"] = tag_
    _tmp["time"] = time_
    _tmp["url"] = url_
    post_list_dic["%s"%id] = _tmp
    id+=1

str_=json.dumps(post_list_dic,indent=4,ensure_ascii=False)
print(str_)