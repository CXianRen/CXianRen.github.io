import json
import glob

post_list_dic = {
    "all": {

    },
    "classes": {
        # classname : {}
    },
    "tags": {
        # tagname : {
        #   id : info}

    }
}
postlists = glob.glob("./post/*.md")
id = 1
for post in postlists:
    name_, class_, tag_, time_ = post.split("_")
    url_ = name_
    name_ = name_.replace("./post/", '')
    time_ = time_.replace(".md", "")
    _tmp = dict()
    _tmp["name"] = name_
    _tmp["class"] = class_
    _tmp["tag"] = tag_
    _tmp["time"] = time_
    _tmp["url"] = url_
    post_list_dic["all"]["%s" % id] = _tmp
    if tag_ not in post_list_dic["tags"]:
        post_list_dic["tags"][tag_] = dict()
    post_list_dic["tags"][tag_]["%s" % id] = _tmp

    if class_ not in post_list_dic["classes"]:
        post_list_dic["classes"][class_] = dict()
    post_list_dic["classes"][class_]["%s" % id] = _tmp

    id += 1

str_ = json.dumps(post_list_dic, indent=4, ensure_ascii=False)
print(str_)
